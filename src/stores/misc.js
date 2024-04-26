import { defineStore } from "pinia";

export const useMiscStore = defineStore("storeId", {
  state: () => {
    /**
     * @type {{ mode: 'normal' | 'mirror' | 'chaos', avatars: {{ id: number, element: string, name: string, icon: string }} }}
     */
    const state = {
      mode: "normal",
      avatars: [],
    };

    return state;
  },
  actions: {
    setMode(mode) {
      this.mode = mode;

      if (this.mode === "mirror") {
        document.querySelector(":root").classList.add("bg-mirror");
      } else {
        document.querySelector(":root").classList.remove("bg-mirror");
      }

      if (this.mode === "chaos") {
        document.querySelector(":root").classList.add("bg-chaos");
      } else {
        document.querySelector(":root").classList.remove("bg-chaos");
      }
    },
    setAvatars(avatars) {
      this.avatars = avatars;
    },
  },
});
