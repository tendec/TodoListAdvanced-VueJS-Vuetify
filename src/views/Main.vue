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
                :error-messages="valid ? '' : 'Title card invalid!'"
                @keyup.enter="addNewCard"
                @input="valid = true"
                clearable
              ></v-text-field>
              <v-btn disabled icon><v-icon x-small>fas fa-trash</v-icon></v-btn>
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
      <v-dialog v-model="dialog" persistent max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="button" v-bind="attrs" v-on="on"
            ><v-icon small>fas fa-trash</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title>Confirm remove all cards?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">No</v-btn>
            <v-btn
              @click="
                removeAllCards();
                dialog = false;
              "
              >Yes</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card class="d-flex flex-column align-center justify-space-around">
        <v-card>Username: {{ info }}</v-card>
        <v-btn class="button" width="fit-content" @click="logoutBtn"
          ><v-icon left small>fas fa-sign-out-alt</v-icon>Logout</v-btn
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
      dialog: false,
      valid: true,
    };
  },
  components: {
    Card,
  },
  computed: {
    cards() {
      return this.$store.state.activeUser.cards;
    },
    info() {
      return this.$store.state.activeUser.username;
    },
  },
  methods: {
    addNewCard() {
      const self = this;
      this.$store.dispatch("addNewCard", this.title).then((r) => {
        self.valid = r;
        if (r == true) {
          self.title = "";
          self.$store.commit("saveData");
        }
      });
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

<style scoped>
.cards {
  overflow: auto;
}
.input-title >>> input {
  text-align: center;
  text-transform: uppercase;
}
</style>
