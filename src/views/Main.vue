<template>
  <v-container class="d-flex align-center justify-center">
    <v-card
      class="d-flex flex-column align-center justify-space-around cards"
      min-height="600px"
      flat
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
          <v-card
            class="d-flex flex-column align-center justify-space-between ma-2"
            width="300px"
            height="350px"
            elevation="1"
          >
            <v-card-title class="d-flex align-center" flat>
              <v-text-field
                class="input-title"
                v-model="title"
                type="text"
                placeholder="title"
                :error-messages="valid ? '' : 'Title card existed!'"
                @keyup.enter="addNewCard"
                @input="valid = true"
              ></v-text-field>
              <v-btn disabled icon
                ><v-icon>mdi-check-box-multiple-outline</v-icon></v-btn
              >
            </v-card-title>
            <v-card height="100%" width="270px" flat>
              <v-card-text
                class="text-center text-h4 text-uppercase text--disabled"
                >Sample</v-card-text
              >
            </v-card>
            <v-text-field type="text" placeholder="items..."></v-text-field>
          </v-card>
        </v-card>
      </v-card>
      <v-btn width="fit-content" @click="removeAllCards">-</v-btn>
      <v-card class="d-flex flex-column align-center justify-space-around">
        <v-card>Username: {{ info }}</v-card>
        <v-btn class="button" width="fit-content" @click="logoutBtn"
          >Logout</v-btn
        >
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  data() {
    return {
      title: "",
      valid: true,
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
      this.$store.commit("addNewCard", this.title);
      this.title = "";
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
  } /* 
  watch: {
    cards() {
      this.valid = false;
    },
  }, */,
};
</script>

<style scoped>
.cards {
  overflow: auto;
}
.input-title >>> input {
  text-align: center;
  text-transform: uppercase;
}
</style>
