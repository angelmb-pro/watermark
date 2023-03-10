import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Card from '@/views/Card.vue';
import Watermark from '@/views/Watermark.vue';
import Settings from '@/views/Settings.vue';
import About from '@/views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/card",
    name: "Card",
    component: Card,
  },
  {
    path: "/watermark",
    name: "Watermark",
    component: Watermark,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
