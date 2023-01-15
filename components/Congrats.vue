<template>
  <div>
    <div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div class="flex items-center min-h-screen px-4 py-8">
          <div
            class="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"
          >
            <div class="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 class="text-lg font-medium text-gray-800">Congratulations</h4>
              <p v-if="meal_type === 0" class="mt-2 text-[15px] leading-relaxed text-gray-500">
                You have won the game, but no credits were given.
              </p>
              <p v-else class="mt-2 text-[15px] leading-relaxed text-gray-500">
                You have won the game and earned yourself one extra {{ meal_type == 1 ? "breakfast" : "dinner" }}
                credit!
              </p>
              <div class="items-center gap-2 mt-3 sm:flex">
                <NuxtLink to="/">
                  <button
                    class="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none"
                  >
                    Close
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Congrats",
  props: {
    meal_type: {
      required: true,
    }
  }
}
</script>