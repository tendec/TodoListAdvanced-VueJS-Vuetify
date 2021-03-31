<template>
  <v-app>
    <v-main class="d-flex align-center justify-center"><router-view /></v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({}),

  created() {
    this.$store.commit("loadData");
  },
};
</script>
