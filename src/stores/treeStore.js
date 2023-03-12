import axios from "axios";
import { defineStore } from "pinia";
import { useRoute } from 'vue-router';

export let useTree = defineStore('tree', {
  state: () => ({
    items: {},
    item: {},
  }),

  actions: {
    async fill() {
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
      this.item = {};

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
        console.log(error);
      }
    }
  },

  getters: {
    get: (state) => {
      return state.item;
    },
    list: (state) => {
      return state.items;
    }
  }
});
