import { createRouter, createWebHistory } from "vue-router";

// Pages
import { Home, NotFound } from "@/pages";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
