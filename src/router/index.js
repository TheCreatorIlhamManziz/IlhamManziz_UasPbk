import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import { useUserStore } from "../stores/user";

const routes = [
  { path: "/", redirect: "/dashboard/home" },

  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },

  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "home" },
      { path: "home", component: () => import("../views/Home.vue") },
      { path: "katalog", component: () => import("../views/Katalog.vue") },
      {
        path: "senjata/:id",
        component: () => import("../views/SenjataDetail.vue"),
        props: true,
      },
      { path: "keranjang", component: () => import("../views/Keranjang.vue") },
      { path: "riwayat", component: () => import("../views/Riwayat.vue") },
      { path: "profil", component: () => import("../views/Profil.vue") },
    ],
  },

  { path: "/home", redirect: "/dashboard/home" }, // optional typo‑helper
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();
  userStore.loadUser();

  if (to.meta.requiresAuth && !userStore.user) {
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/register") &&
    userStore.user
  ) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
