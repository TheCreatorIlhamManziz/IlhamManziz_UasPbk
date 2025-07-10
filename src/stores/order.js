import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  actions: {
    addOrder(order) {
      this.orders.push(order);
      this.saveOrders();
    },
    hapusOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
      this.saveOrders();
    },
    loadOrders() {
      const data = localStorage.getItem("orders");
      if (data) this.orders = JSON.parse(data);
    },
    saveOrders() {
      localStorage.setItem("orders", JSON.stringify(this.orders));
    },
  },
  persist: true,
});
