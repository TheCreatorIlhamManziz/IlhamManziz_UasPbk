import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCart(senjata) {
      const existing = this.items.find((item) => item.id === senjata.id);
      if (!existing) {
        this.items.push({ ...senjata, jumlah: 1 });
      } else {
        existing.jumlah++;
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
  // Menyimpan state ke localStorage agar tetap ada setelah refresh
  persist: true,
});
