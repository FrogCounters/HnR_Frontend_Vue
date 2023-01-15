<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl text-center font-bold">Welcome to my website!</h1>
    <p class="text-xl text-center">This is the home page.</p>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<!-- As you can see, this is a very simple component, the syntax between React and Vue are quite similar, the main 
difference is that in Vue, we use templates and script tags instead of JSX. I've removed the Component import 
and the render method, since in Vue we don't have to define a class component like in React. Instead, you can 
simply define a default export object containing the component's options, such as the name property. The rest of 
the code is the same as the original React component. -->
