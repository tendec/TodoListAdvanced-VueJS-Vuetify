<template>
  <v-card
    class="container"
    max-width="100vw"
    height="100vh"
    flat
    color="#ebebeb"
  >
    <v-card
      class="d-flex flex-column align-center justify-center ui-container"
      flat
      color="#0000"
      ><div class="text-capitalize text-center page-title ma-4 mb-7">Todos</div>
      <v-dialog v-model="dialog" persistent max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="button btnRemoveAll"
            v-bind="attrs"
            v-on="on"
            color="#fece2f"
            ><v-icon small>fas fa-trash</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title>Confirm remove all cards?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" color="#fece2f">No</v-btn>
            <v-btn
              @click="
                removeAllCards();
                dialog = false;
              "
              color="#fece2f"
              >Yes</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-hover v-slot="{ hover }">
        <v-card
          class="d-flex flex-column align-center justify-space-around user-info"
          flat
          color="#0000"
        >
          <v-card class="ma-2" flat color="#0000">Username: {{ info }}</v-card>
          <v-scroll-y-transition>
            <v-btn
              class="button mb-2"
              width="fit-content"
              @click="logoutBtn"
              v-if="hover"
              color="#fece2f"
              ><v-icon left small>fas fa-sign-out-alt</v-icon>Logout</v-btn
            >
          </v-scroll-y-transition>
        </v-card>
      </v-hover>
      <div class="d-flex flex-column cards">
        <v-card class="d-flex flex-wrap" color="#0000">
          <card v-for="card in cards" :key="card.code" :data="card" />
          <v-card
            class="d-flex flex-column align-center justify-space-between sample-card ma-3"
            width="350px"
            height="372px"
            elevation="1"
            color="#0000"
          >
            <v-card-title class="d-flex align-center" flat>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="input-title"
                    v-model="title"
                    v-bind="attrs"
                    v-on="on"
                    type="text"
                    placeholder="title"
                    :error-messages="valid ? '' : 'Title card invalid!'"
                    @keyup.enter="addNewCard"
                    @input="valid = true"
                    clearable
                    color="#fece2f"
                  ></v-text-field>
                </template>
                <span>Type new title to add new card</span>
              </v-tooltip>
              <v-btn class="button btn-removeCard" icon disabled color="#fece2f"
                ><v-icon small>fas fa-times</v-icon></v-btn
              >
            </v-card-title>
            <v-card height="100%" width="270px" flat color="#0000">
              <div
                class="text-center text-uppercase text--disabled sample-text"
              >
                Sample
              </div>
            </v-card>
            <v-text-field
              type="text"
              placeholder="items..."
              disabled
            ></v-text-field>
          </v-card>
        </v-card>
      </div>
    </v-card>
    <div class="deco1"></div>
    <div class="deco2"></div>
    <div class="deco3"></div>
    <div class="deco4"></div>
  </v-card>
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
.container {
  overflow: hidden;
  z-index: 0;
  background-image: linear-gradient(
    to bottom left,
    #fefefe,
    #fece2fbe
  ) !important;
}
.cards {
  max-width: 84vw;
  max-height: 70vh;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 5;
}
.sample-card {
  animation: flipInX 0.7s;
  background-image: linear-gradient(
    to top right,
    #fefefe,
    #fece2fbe
  ) !important;
  backdrop-filter: blur(10px);
}
.input-title >>> input {
  text-align: center;
  text-transform: uppercase;
}
.btnRemoveAll {
  position: absolute;
  top: 0;
  right: 240px;
}
.user-info {
  position: absolute;
  top: 0;
  right: 24px;
  z-index: 5;
}
.btn-removeCard {
  position: absolute;
  top: 0;
  right: 0;
}
.sample-text {
  font-family: "Train One", cursive;
  font-size: 4em;
  width: 300px;
  transform: rotate(-30deg);
  opacity: 0.2;
  position: relative;
  right: 24px;
  top: 36px;
}
.container::before {
  content: "";
  width: 400px;
  height: 500px;
  border-radius: 50%;
  background-color: #fece2f;
  position: absolute;
  left: -25px;
  top: -150px;
  transform: rotate(100deg);
  z-index: 1;
}
.container::after {
  content: "";
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  background-color: #fece2f;
  position: absolute;
  right: -400px;
  top: 60px;
  z-index: 1;
}
.deco1 {
  width: 400px;
  height: 400px;
  border-radius: 50% !important;
  box-shadow: -5px -5px 5px 5px #ffffff24;
  background-color: #ebebeb;
  position: absolute;
  right: 112px;
  top: -12px;
  z-index: 2;
  background-image: linear-gradient(to bottom, #fefefe, #fece2fbe) !important;
}
.deco2 {
  width: 200px;
  height: 200px;
  border-radius: 50% !important;
  background-color: #fece2f;
  position: absolute;
  right: 36px;
  top: 62px;
  z-index: 3;
}
.deco3 {
  width: 400px;
  height: 600px;
  border-radius: 50% !important;
  background-color: #fece2f;
  position: absolute;
  right: 212px;
  top: 210px;
  z-index: 4;
}
.deco4 {
  width: 300px;
  height: 300px;
  border-radius: 50% !important;
  box-shadow: -5px -5px 5px 5px #ffffff54;
  background-color: #ebebeb;
  position: absolute;
  right: 100px;
  top: 169px;
  z-index: 1;
  background-image: linear-gradient(
    to bottom left,
    #fefefe,
    #fece2fbe
  ) !important;
}
</style>
