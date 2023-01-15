import { defineStore } from "pinia";
import { SendRequest } from "../utils/connectApi";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      auth: window.localStorage.getItem("authData") || null,
      data: null,
    };
  },
  // could also be defined as
  actions: {
    checkAuth(auth) {
      if (auth) {
        SendRequest("POST", "profile", { token: auth.value }, auth).then(
          (data) => {
            if (!data) {
              this.setAuth(null);
            } else {
              this.setData(data);
            }
          }
        );
      }
    },
    setAuth(token) {
      this.auth = token;
    },
    setData(data) {
      this.data = data;
    },
  },
});
