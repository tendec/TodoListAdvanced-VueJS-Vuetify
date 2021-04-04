<template>
  <v-card class="d-flex align-center todos" height="21%" flat>
    <v-checkbox
      class="ml-2 mt-5"
      on-icon="mdi-checkbox-marked-outline"
      v-model="data.done"
      :color="data.done ? 'success' : ''"
      @click="checkItem"
      ><template v-slot:label
        ><v-card :class="data.done ? 'success--text' : ''" flat>{{
          data.content
        }}</v-card></template
      ></v-checkbox
    >
    <v-menu offset-x
      ><template v-slot:activator="{ on, attrs }"
        ><v-btn class="button" small icon v-bind="attrs" v-on="on"
          ><v-icon small :color="color">mdi-flag</v-icon></v-btn
        ></template
      ><v-list>
        <v-list-item>
          <v-btn class="button" icon
            ><v-icon small color="red" @click="setColor('red')"
              >mdi-flag</v-icon
            ></v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn class="button" icon
            ><v-icon small color="yellow" @click="setColor('yellow')"
              >mdi-flag</v-icon
            ></v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn class="button" icon
            ><v-icon small color="green" @click="setColor('green')"
              >mdi-flag</v-icon
            ></v-btn
          >
        </v-list-item>
      </v-list></v-menu
    >
    <v-scroll-x-transition
      ><v-btn class="button ml-auto" icon @click="removeItem" v-if="data.done"
        ><v-icon color="red darken-1">mdi-close-box</v-icon></v-btn
      ></v-scroll-x-transition
    >
  </v-card>
</template>

<script>
export default {
  name: "Item",
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {
          content: "",
          priority: "",
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    color() {
      return this.data.priority;
    },
  },
  methods: {
    checkItem() {
      this.done = true;
      this.$store.commit("saveData");
    },
    removeItem() {
      let cards = this.$store.state.activeUser.cards;
      let code = this.data.code;
      for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards[i].todos.length; j++) {
          if (cards[i].todos[j].code == code) {
            cards[i].todos.splice(j, 1);
            this.$store.commit("saveData");
          }
        }
      }
    },
    setColor(color) {
      this.data.priority = color;
      this.$store.commit("saveData");
    },
  },
};
</script>

<style scoped></style>
