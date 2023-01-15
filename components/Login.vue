<template>
  <div class="w-3/4 sm:1/2 lg:w-1/3 p-5 bg-slate-200 rounded-md mx-auto">
    <div class="text-center text-3xl md:text-4xl font-bold">Login</div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-5">
        <label class="text-sm font-medium text-gray-900 dark:text-white"
          >NUSnet ID</label
        >
        <input
          type="text"
          v-model="nusnet"
          class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 text-black"
          placeholder="E0123456"
          required
        />
      </div>
      <div class="mb-5">
        <label class="text-sm font-medium text-gray-900 dark:text-white"
          >Password</label
        >
        <input
          type="password"
          v-model="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 text-black"
          placeholder="•••••••••"
          required
        />
      </div>
      <div>
        <button type="submit" class="rounded-lg bg-customblue text-white p-2">
          {{ loading ? "Loading..." : "Submit" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { SendRequest } from "../utils/connectApi";
import { useAuthStore } from "~/store/auth";

export default {
  setup() {
    const store = useAuthStore();
    const { setAuth, setData } = store;

    return {
      store,
      setAuth,
      setData,
    };
  },

  data() {
    return {
      nusnet: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;

      SendRequest("POST", "user", {
        username: this.nusnet,
        password: this.password,
      }).then((data) => {
        this.setAuth(data.token);
        window.localStorage.setItem("authData", data.token);
        SendRequest("POST", "profile", { token: data.token }).then((data) => {
          this.setData(data);
        });
      });
      this.loading = false;
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
