<template>
  <v-app>
    <v-main class="d-flex align-center justify-center main"
      ><router-view
    /></v-main>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({}),

  created() {
    this.$store.commit("loadData");
    if (this.$store.state.activeUser !== null) {
      this.$router.push({ name: "Main" });
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Train+One&display=swap");
.main {
  overflow: hidden;
}
.ui-container {
  font-family: "Lemonada", cursive;
  overflow: hidden;
}
.todo-title {
  font-family: "Train One", cursive;
  font-size: 12em;
  transform: rotate(-50deg);
  opacity: 0.1;
  position: relative;
  right: 24px;
}
.ui-form {
  position: relative;
  right: 55px;
  z-index: -1;
}
.page-title {
  font-size: 2em;
}
.button:hover {
  animation: rubberBand 0.5s;
}
.button:focus {
  animation: headShake 1s;
}
</style>
