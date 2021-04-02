<template>
  <v-container class="d-flex align-center justify-center" style="height: 100%">
    <v-card
      class="d-flex flex-column align-center justify-space-around"
      elevation="7"
      width="100vw"
      height="100vh"
    >
      <div class="text-h4 text-capitalize text-center">Todos</div>
      <v-card
        class="d-flex flex-column align-center justify-space-around"
        flat
        width="100%"
        height="fit-content"
      >
        <v-card class="d-flex flex-wrap" flat>
          <card v-for="(card, index) in cards" :key="index" :data="card" />
        </v-card>
      </v-card>
      <v-btn class="button" width="fit-content" @click="addNewCard">+</v-btn>
      <v-btn class="button" width="fit-content" @click="removeAllCards"
        >-</v-btn
      >
      <v-card>Username: {{ info }}</v-card>
      <v-btn class="button" width="fit-content" @click="logoutBtn"
        >Logout</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  data() {
    return {
      info: this.$store.state.activeUser.username,
    };
  },
  components: {
    Card,
  },
  computed: {
    cards() {
      return this.$store.state.activeUser.cards;
    },
  },
  methods: {
    addNewCard() {
      this.$store.commit("addNewCard");
      this.$store.commit("saveData");
    },
    removeAllCards() {
      this.$store.commit("removeAllCards");
      this.$store.commit("saveData");
    },
    logoutBtn() {
      this.$store.state.activeUser = null;
      this.$store.commit("saveData");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
