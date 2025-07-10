import { defineStore } from "pinia";

export const useRiwayatStore = defineStore("riwayat", {
  state: () => ({
    list: [],
  }),
  actions: {
    add(data) {
      this.list.push(data);
    },
  },
});
