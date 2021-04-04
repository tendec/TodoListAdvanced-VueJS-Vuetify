<template>
  <v-card
    class="d-flex flex-column align-center justify-space-between ma-2"
    width="300px"
    height="350px"
  >
    <v-card class="d-flex align-center" flat>
      <v-card-title
        ><v-text-field
          class="input-title"
          v-model="data.title"
          type="text"
          placeholder="title"
          clearable
        ></v-text-field
      ></v-card-title>
      <v-dialog v-model="dialog" persistent max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="button" icon v-bind="attrs" v-on="on"
            ><v-icon small>fas fa-times</v-icon></v-btn
          >
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
    <v-card class="d-flex flex-column cards" height="100%" width="270px" flat>
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
    ></v-text-field>
  </v-card>
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
.cards {
  overflow-x: hidden;
  overflow-y: auto;
}
.input-title >>> input {
  text-align: center;
  text-transform: uppercase;
}
</style>
