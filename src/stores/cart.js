import { defineStore } from "pinia";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    async loadCart() {
      const user = getAuth().currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "carts", user.uid));
      this.items = snap.exists() ? snap.data().items || [] : [];
    },
    async saveCart() {
      const user = getAuth().currentUser;
      if (!user) return;
      await setDoc(doc(db, "carts", user.uid), { items: this.items });
    },
    async addToCart(item) {
      const existing = this.items.find((i) => i.id === item.id);
      existing ? existing.jumlah++ : this.items.push({ ...item, jumlah: 1 });
      await this.saveCart();
    },
    async removeFromCart(id) {
      this.items = this.items.filter((i) => i.id !== id);
      await this.saveCart();
    },
    async clearCart() {
      this.items = [];
      await this.saveCart();
    },
  },
});
