<template>
  <v-app>
    <v-main class="d-flex align-center justify-center"><router-view /></v-main>
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
.button:hover {
  animation: rubberBand 0.5s;
}
.button:focus {
  animation: headShake 1s;
}
</style>
