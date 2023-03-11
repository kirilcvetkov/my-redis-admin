import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/id/:id",
      name: "get",
      component: HomeView,
    },
    {
      path: '/:catchAll(.*)',
      component: HomeView,
      name: 'NotFound'
    }
  ],
});

export default router;
