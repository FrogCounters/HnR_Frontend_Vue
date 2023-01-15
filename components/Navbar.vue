<template>
  <div
    class="navigation w-full flex justify-between bg-slate-900 fixed text-white z-50 items-center h-30"
  >
    <div class="ml-3">
      <router-link class="font-bold" to="/">NUS Dining War</router-link>
    </div>
    <div>
      <ol class="flex" v-if="auth">
        <li class="p-3">
          <router-link class="hover:border-slate-200" to="/dashboard"
            >Dashboard</router-link
          >
        </li>
        <li class="p-3">
          <router-link class="hover:border-slate-200" to="/game"
            >Game</router-link
          >
        </li>
        <li class="p-3 cursor-pointer" @click="logout">Logout</li>
      </ol>
      <ol class="flex" v-else>
        <li class="p-3">
          <router-link class="hover:border-slate-200" to="/login"
            >Login</router-link
          >
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useAuthStore();
    const { auth } = storeToRefs(store);
    const { setAuth, setData } = store;

    return {
      auth,
      setAuth,
      setData,
    };
  },

  methods: {
    logout() {
      this.setAuth(null);
      this.setData(null);
      window.localStorage.setItem("authData", "");
      this.$router.push({ name: "index" });
    },
  },
};
</script>
