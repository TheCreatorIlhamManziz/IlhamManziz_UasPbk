// stores/user.js
import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    setUser(user) {
      this.user = user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    },

    loadUser() {
      const saved = localStorage.getItem("user");
      if (saved) {
        this.user = JSON.parse(saved);
      }
    },

    listenAuth() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.setUser(user ? { uid: user.uid, email: user.email } : null);
      });
    },

    async logout() {
      const auth = getAuth();
      await signOut(auth);
      this.setUser(null);
    },
  },
});
