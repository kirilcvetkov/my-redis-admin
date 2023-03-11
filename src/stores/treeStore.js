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
    async getItem() {
      const route = useRoute();
      const key = route.params.id;

      if (! key || key == this.item.request) {
        return;
      }

      this.item = {};

      // testing
      let r = await import('@/response.json');
      this.item = r.default || {};
      this.item.request = key;
      return;

      try {
        const res = await axios.get(`/api.php?key=` + key);
        this.item = res.data || {};
        // this.item.request = key;
        console.log(res.data, this.item);
      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
    getItemValue: (state) => {
      return state.item;
    },
    get: (state) => {
      return state.items;
    }
  }
});
