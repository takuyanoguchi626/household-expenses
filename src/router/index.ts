import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "",
    component: () => import("../views/Calender.vue"),
  },
  {
    path: "/calender",
    name: "",
    component: () => import("../views/Calender.vue"),
  },
  {
    path: "/calculator",
    name: "",
    component: () => import("../views/Calculator.vue"),
  },
  {
    path: "/showChart",
    name: "",
    component: () => import("../views/ShowChart.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
