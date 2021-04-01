<template>
  <v-card
    class="d-flex flex-column align-center justify-space-between"
    width="250px"
    height="300px"
  >
    <v-card-title
      ><v-text-field
        class="text-uppercase text-center"
        v-model="data.title"
        type="text"
        placeholder="title"
      ></v-text-field
    ></v-card-title>
    <v-btn width="fit-content">-</v-btn>
    <v-card
      class="d-flex flex-column align-center justify-center"
      height="200px"
    >
    </v-card>
    <v-text-field type="text" placeholder="items..."></v-text-field>
  </v-card>
</template>

<script>
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
        };
      },
    },
  },
  data() {
    return {};
  },
};
</script>
