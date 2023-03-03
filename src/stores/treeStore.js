import { defineStore } from "pinia";
import axios from "axios";
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
    },
    async getItem(key) {
      if (! key) {
        return {};
      }

      this.item = {};

      let r = await import('@/response.json');
      this.item = r.default || {};
      return;

      try {
        const res = await axios.get(`/api.php?key=` + key);
        this.item = res.data || {};
        console.log(res.data, this.item);
      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
    getItemValue() {
      const route = useRoute();
      const key = route.params.id;

      if (! key) {
        return {};
      }

      if (key != this.item.request) {
        this.getItem(key);
      }

      return this.item;
    },
    get() {
      return this.items;
    }
  }
});
