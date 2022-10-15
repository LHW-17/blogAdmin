import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/admin",
  },
  {
    path: "/admin",
    component: () => import("@/pages/Admin.vue"),
    children: [
      {
        path: "",
        component: () => import("@/components/index.vue"),
      },
      {
        path: "manage",
        component: () => import("@/pages/Manage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from) => {
  let token = localStorage.getItem("token");
  if (to.path !== "/login" && token == undefined) {
    return "/login";
  } else {
    return true;
  }
});
export default router;
