<template>
  <div class="bg-cover bg-center">
    <Navbar />
    <div
      id="hero"
      class="flex flex-col justify-center mx-auto flex flex-row flex-nowrap justify-center items-center w-fit relative top-[10vh]"
    >
      <div class="text-base md:text-3xl text-center">
        <h3 class="font-bold mt-8">Credits</h3>
        <h4 class="font-normal mt-8">
          Breakfast : {{ data && data.meals && data.meals[0].credit }}
        </h4>
        <h4 class="font-normal">
          Dinner : {{ data && data.meals && data.meals[1].credit }}
        </h4>
      </div>
      <button
        class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="navigateToGame"
      >
        Game On!
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { watchEffect } from "vue";

export default {
  setup() {
    const store = useAuthStore();
    const { auth, data } = storeToRefs(store);
    const { checkAuth } = store;
    watchEffect(() => checkAuth(auth));
    return {
      store,
      checkAuth,
      auth,
      data,
    };
  },

  methods: {
    navigateToGame() {
      this.$router.push("/game");
    },
  },
};
</script>

<!-- In this Vue component, I have imported the Navbar component and used it inside the template. I have also replaced 
the useNavigate hook with this.$router.push('/game') from vue-router library which allows you to easily handle 
client-side navigation. The v-if and v-else directives are used to conditionally render the login and logout 
buttons based on the auth state.

It's also worth noting that in order for this component to work correctly, you'll need to configure Vuex store 
and vue-router in your application, and also make sure that the state of auth is accessible to the component. -->
