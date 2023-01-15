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
              <h4 class="text-lg font-medium text-gray-800">Noooooooooo</h4>
              <p class="mt-2 text-[15px] leading-relaxed text-gray-500">
                You have lost the game and your dining credit is gone :D
              </p>
              <div class="items-center gap-2 mt-3 sm:flex">
                <NuxtLink to="/">
                  <button
                    class="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none"
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
