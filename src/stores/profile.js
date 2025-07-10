// stores/profile.js
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    nama: "",
    email: "",
    deskripsi: "",
    lokasi: "",
  }),
  actions: {
    loadProfile() {
      const data = JSON.parse(localStorage.getItem("userProfile"));
      if (data) Object.assign(this, data);
    },
    saveProfile() {
      localStorage.setItem("userProfile", JSON.stringify(this.$state));
    },
  },
});
