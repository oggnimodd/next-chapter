import { createRouter, createWebHistory } from "vue-router";

// Pages
import { Home, Book, NotFound, Search, Shelf, Profile, Landing } from "@/pages";

const routes = [
  {
    path: "/",
    component: Landing,
  },
  {
    path: "/dashboard",
    component: Home,
  },
  {
    path: "/book/:id/:sub",
    component: Book,
  },
  {
    path: "/shelf/:id",
    component: Shelf,
  },
  {
    path: "/profile",
    component: Profile,
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
