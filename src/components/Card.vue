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
          :rules="[rules.required]"
        ></v-text-field
      ></v-card-title>
      <v-btn @click="removeThisCard" icon
        ><v-icon>mdi-check-box-multiple-outline</v-icon></v-btn
      >
    </v-card>
    <v-card class="d-flex flex-column cards" height="100%" width="270px" flat>
      <item v-for="(item, index) in todos" :key="index" :data="item" />
    </v-card>
    <v-text-field
      type="text"
      placeholder="items..."
      v-model="data.content"
      :error-messages="valid ? '' : 'Todo item existed!'"
      ref="items"
      autofocus
      validate-on-blur
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
      valid: true,
      rules: {
        required: (value) => !!value || "Required!",
      },
    };
  },
  methods: {
    addNewItem() {
      let contents = this.data.todos.map((todo) => todo.content);
      if (!contents.includes(this.data.content)) {
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
  overflow: auto;
}
.input-title >>> input {
  text-align: center;
  text-transform: uppercase;
}
</style>
