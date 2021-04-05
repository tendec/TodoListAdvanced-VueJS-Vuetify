<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="d-flex flex-column align-center ma-3 card"
      width="350px"
      height="372px"
      :class="[data.done ? 'cardDone' : '', data.remove ? 'removeCard' : '']"
      color="#0000"
    >
      <v-card class="d-flex align-center" flat color="#0000">
        <v-card-title
          ><v-text-field
            class="input-title"
            v-model="data.title"
            type="text"
            placeholder="title"
            :clearable="hover"
            color="#fece2f"
          ></v-text-field
        ></v-card-title>
        <v-dialog v-model="dialog" persistent max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-scroll-x-transition>
              <v-btn
                class="button btn-removeCard"
                icon
                v-bind="attrs"
                v-on="on"
                v-if="hover"
                color="#fece2f"
                ><v-icon small>fas fa-times</v-icon></v-btn
              >
            </v-scroll-x-transition>
          </template>
          <v-card>
            <v-card-title>Confirm remove this card?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" color="#fece2f">No</v-btn>
              <v-btn
                @click="
                  removeThisCard();
                  dialog = false;
                "
                color="#fece2f"
                >Yes</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
      <div
        class="d-flex flex-column items"
        height="200px"
        width="300px"
        flat
        :ripple="false"
        color="#f3f3f3"
        @click="checkCard"
      >
        <item v-for="item in todos" :key="item.content" :data="item" />
      </div>
      <v-text-field
        type="text"
        placeholder="items..."
        v-model="data.content"
        :error-messages="valid ? '' : 'Todo item invalid!'"
        ref="items"
        clearable
        @keyup.enter="addNewItem"
        @input="valid = true"
        color="#fece2f"
      ></v-text-field>
    </v-card>
  </v-hover>
</template>

<script>
import Item from "./Item.vue";
import itemTodo from "../assets/class/item.js";
export default {
  name: "Card",
  props: {
    data: {
      type: Object,
      required: true,
      dafault() {
        return {
          title: "",
          todos: [],
          content: "",
        };
      },
    },
  },
  components: {
    Item,
  },
  computed: {
    todos() {
      return this.data.todos;
    },
  },
  data() {
    return {
      dialog: false,
      valid: true,
      rules: {
        required: (value) => !!value || "Required!",
      },
    };
  },
  methods: {
    addNewItem() {
      let contents = this.data.todos.map((todo) => todo.content);
      if (!contents.includes(this.data.content) && this.data.content !== "") {
        let item = new itemTodo(this.data.content, "");
        this.data.todos.push(item);
        this.data.content = "";
        this.$refs.items.resetValidation();
        this.$store.commit("saveData");
      } else {
        this.valid = false;
      }
    },
    checkCard() {
      let dones = [];
      for (let i = 0; i < this.todos.length; i++) {
        dones.push(this.todos[i].done);
      }
      if (dones.includes(false)) {
        this.data.done = false;
      } else {
        this.data.done = true;
      }
      this.$store.commit("saveData");
    },
    removeThisCard() {
      let cards = this.$store.state.activeUser.cards;
      let code = this.data.code;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].code == code) {
          cards[i].remove = true;
          setTimeout(() => {
            cards.splice(i, 1);
            this.$store.commit("saveData");
          }, 500);
        }
      }
    },
  },
};
</script>

<style scoped>
.items {
  overflow-x: hidden;
  overflow-y: auto;
  width: 300px;
  height: 300px;
}
.input-title >>> input {
  text-align: center;
  text-transform: uppercase;
}
.card {
  animation: flipInX 0.7s;
  background-image: linear-gradient(
    to top right,
    #fefefe,
    #fece2fa2
  ) !important;
  backdrop-filter: blur(10px);
}
.cardDone {
  border: 5px solid #4caf50 !important;
  transition: border 0.1s;
}
.btn-removeCard {
  position: absolute;
  top: 0;
  right: -33px;
}
.removeCard {
  animation: flipOutX 0.5s;
}
</style>
