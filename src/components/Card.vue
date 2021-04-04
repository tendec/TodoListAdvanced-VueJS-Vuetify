<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="d-flex flex-column align-center ma-3"
      width="350px"
      height="372px"
      hover
      :class="data.done ? 'cardDone' : ''"
    >
      <v-card class="d-flex align-center" flat>
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
              <v-btn @click="dialog = false">No</v-btn>
              <v-btn @click="removeThisCard">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
      <v-card
        class="d-flex flex-column items"
        height="200px"
        width="300px"
        flat
        :ripple="false"
        @click="checkCard"
      >
        <item v-for="(item, index) in todos" :key="index" :data="item" />
      </v-card>
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
          cards.splice(i, 1);
          this.$store.commit("saveData");
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
}
.input-title >>> input {
  text-align: center;
  text-transform: uppercase;
}
.cardDone {
  border: 3px solid #4caf50;
}
.btn-removeCard {
  position: absolute;
  top: 0;
  right: -33px;
}
</style>
