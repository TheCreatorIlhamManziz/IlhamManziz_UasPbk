// stores/order.js
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
    // Ambil pesanan milik user saat ini
    async fetchOrders() {
      const user = getAuth().currentUser;
      if (!user) return;

      const q = query(collection(db, "orders"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      this.orders = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    },

    // Tambahkan pesanan baru
    async addOrder(order) {
      const user = getAuth().currentUser;
      if (!user) return;

      await addDoc(collection(db, "orders"), {
        ...order,
        uid: user.uid, // ⬅️ disimpan supaya fetchOrders bisa filter
        email: user.email, // ⬅️ simpan juga email jika ingin ditampilkan
        status: "Diproses",
        waktu: new Date().toISOString(),
      });

      await this.fetchOrders(); // ⬅️ refresh otomatis
    },

    // Batalkan pesanan
    async cancelOrder(orderId) {
      const ref = doc(db, "orders", orderId);
      await updateDoc(ref, { status: "Dibatalkan" });
      await this.fetchOrders();
    },
  },
});
