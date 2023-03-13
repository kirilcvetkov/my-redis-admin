import axios from "axios";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { defineStore } from "pinia";
import { useRoute } from 'vue-router';

export let useTree = defineStore('tree', {
  persist: true,
  state: () => ({
    isConnecting: false,
    host: '',
    port: 6379,
    username: null,
    password: null,
    database: 0,
    items: {},
    item: {},
  }),

  actions: {
    async fill() {
      if (! this.isConfigured) {
        return;
      }

      // testing
      let r = await import('@/tree.json');
      this.items = r.default || {};
      return;

      try {
        const res = await axios.get(`/api.php`);
        this.items = res.data || {};
        console.log(res.data, this.items);
      } catch (error) {
        console.log(error);
      }
    },
    async getItem(id, oldId) {
      // testing
      let r = await import('@/response.json');
      this.item = r.default || {};
      this.item.refcount = Math.floor(Math.random() * 123);

      return;

      try {
        const res = await axios.get(`/api.php?key=` + id);
        this.item = res.data || {};
        console.log(res.data, this.item);
      } catch (error) {
        this.item = {};
        console.log(error);
      }
    }
  },

  getters: {
    isConfigured: (state) => {
      return state.host.length > 0;
    },
    get: (state) => {
      return state.item;
    },
    list: (state) => {
      return state.items;
    },
    validateHost: (state) => {
      return state.host.length > 0;
    },
    validatePort: (state) => {
      return state.port > 0;
    },
  }
});
