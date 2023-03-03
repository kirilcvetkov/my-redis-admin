import { reactive } from "vue";

export let counter = reactive({
    count: 0,

    // actions
    increment() {
        this.count++;
    }
});
