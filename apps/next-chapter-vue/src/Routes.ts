import { createRouter, createWebHistory } from "vue-router";

// Pages
import { Home, NotFound, Search, Shelf } from "@/pages";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/shelf/:id",
    component: Shelf,
  },
  {
    path: "/search",
    component: Search,
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
