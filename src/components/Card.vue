<template>
  <v-card
    class="d-flex flex-column align-center justify-space-between mr-4"
    width="300px"
    height="350px"
  >
    <v-card class="d-flex align-center" flat>
      <v-card-title
        ><v-text-field
          class="text-uppercase text-center"
          v-model="data.title"
          type="text"
          placeholder="title"
        ></v-text-field
      ></v-card-title>
      <v-btn width="fit-content" x-small @click="removeThisCard">-</v-btn>
    </v-card>
    <v-card class="d-flex flex-column cards" height="100%" width="270px" flat>
      <item v-for="(item, index) in todos" :key="index" :data="item" />
    </v-card>
    <v-text-field
      type="text"
      placeholder="items..."
      v-model="data.content"
      @keyup.enter="addNewItem"
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
    return {};
  },
  methods: {
    addNewItem() {
      let item = new itemTodo(this.data.content, "");
      this.data.todos.push(item);
      this.data.content = "";
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
.cards {
  overflow: auto;
}
</style>
