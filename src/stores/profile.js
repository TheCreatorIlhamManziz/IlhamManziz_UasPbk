// stores/profile.js
import { defineStore } from "pinia";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    data: {
      nama: "",
      email: "",
      deskripsi: "",
      lokasi: "",
      foto: "",
    },
  }),
  actions: {
    async fetchProfile() {
      const user = getAuth().currentUser;
      if (!user) return;
      const ref = doc(db, "profiles", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        this.data = snap.data();
      } else {
        this.data.email = user.email;
      }
    },
    async saveProfile() {
      const user = getAuth().currentUser;
      if (!user) return;
      const ref = doc(db, "profiles", user.uid);
      await setDoc(ref, this.data);
    },
  },
});
