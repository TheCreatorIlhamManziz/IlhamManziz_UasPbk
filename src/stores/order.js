import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  actions: {
    async fetchOrders() {
      const user = getAuth().currentUser;
      if (!user) return;

      const q = query(collection(db, "orders"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      this.orders = querySnapshot.docs
        .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
        .filter((order) => order.status !== "Dibatalkan"); // hanya yang belum dibatalkan
    },

    async addOrder(order) {
      const user = getAuth().currentUser;
      if (!user) return;

      await addDoc(collection(db, "orders"), {
        ...order,
        uid: user.uid,
        status: "Diproses",
        waktu: new Date().toISOString(),
      });
      await this.fetchOrders();
    },

    async cancelOrder(orderId) {
      const ref = doc(db, "orders", orderId);
      await updateDoc(ref, { status: "Dibatalkan" });

      // Langsung hapus dari state orders (agar hilang dari tampilan)
      this.orders = this.orders.filter((order) => order.id !== orderId);
    },
  },
});