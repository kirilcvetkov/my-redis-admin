<?php

header('Content-Type: application/json; charset=utf-8');

#### 1. Code it with phpredis

$redis = new Redis();
$redis->connect('localhost', 6379);
$redis->setOption(Redis::OPT_SCAN, Redis::SCAN_RETRY);

$request = $_REQUEST['key'] ?? null;

if ($request) {
    $ttl = $redis->ttl($request);
    $encoding = $redis->object("encoding", $request);
    $refcount = $redis->object("refcount", $request);

    switch ($redis->type($request)) {
        case Redis::REDIS_STRING:
            $type = 'String';
            $value = $redis->get($request);
            $size = strlen($value);
            break;

        case Redis::REDIS_SET:
            $type = 'Set';
            $value = $redis->sMembers($request);
            sort($value);
            $size = count($value);
            break;

        case Redis::REDIS_LIST:
            $type = 'List';
            $value = $redis->get($request);
            $size = $redis->lLen($request);
            break;

        case Redis::REDIS_ZSET:
            $type = 'ZSet';
            $value = array_map(function($value) use ($redis, $request) {
                return [
                    'score' => $redis->zScore($request, $value),
                    'value' => $value,
                ];
            }, $redis->zRange($request, 0, -1));
            $size = count($value);
            break;

        case Redis::REDIS_HASH:
            $type = 'Hash';
            $value = $redis->hGetAll($request);
            ksort($value);
            $size = count($value);
            break;

        case Redis::REDIS_NOT_FOUND:
            $type = 'Not found';
            $value = $redis->get($request);
            break;
    }

    exit(json_encode(compact([
        'type',
        'ttl',
        'encoding',
        'refcount',
        'value',
    ]), JSON_PRETTY_PRINT));
}

$foundKeys = [];
$page = 100;

foreach ([...range('A', 'Z'), ...range('a', 'z'), ...range(0, 9)] as $letter) {
    $it = null;
    $filter = $letter . '*';

    while ($it !== 0) {
        foreach ($redis->scan($it, $filter, $page) ?: [] as $key) {
            $parse = explode(':', $key);
            $foundKeys = fill($parse, $foundKeys);
        }
    }
}

exit(json_encode($foundKeys, JSON_PRETTY_PRINT));

function fill($tree, $parent, $key = null)
{
    if (empty($tree)) {
        return null;
    }

    $name = array_shift($tree);
    $key .= $name . ($tree ? ':' : null);

    $parent[$name]['name'] = $name;
    $parent[$name]['key'] = $key;
    $parent[$name]['children'] = fill($tree, $parent[$name]['children'] ?? [], $key);

    return $parent;
}


#### 2. Code with predis package
