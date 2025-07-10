import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    loadUser() {
      const data = localStorage.getItem("user");
      if (data) this.user = JSON.parse(data);
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
