<template>
  <div class="w-full pt-20 bg-white dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    <div class="text-center text-3xl md:text-4xl font-bold">Login</div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-5">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
        <button type="submit" class="w-full text-white bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {{ loading ? "Loading..." : "Submit" }}
        </button>
      </div>
    </form>
  </div>
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
          console.log("asd", data);
          localStorage.setItem("nusnet", data.nusnet);
          // localStorage.setItem("token", data.token);
          localStorage.setItem("hall_id", data.hall_id);
        });
      });
      this.loading = false;
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
