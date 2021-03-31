<template>
  <v-container class="d-flex align-center justify-center" style="height: 100%">
    <v-card
      class="d-flex flex-column align-center justify-space-around"
      elevation="7"
      width="100vw"
      height="100vh"
    >
      <div class="text-h4 text-capitalize text-center">Todos</div>
      <v-card
        class="d-flex align-center justify-space-around"
        flat
        width="300px"
        height="fit-content"
      >
        <v-btn class="button" width="fit-content">+</v-btn>
        <v-btn class="button" width="fit-content">-</v-btn>
        <v-btn class="button" width="fit-content">Logout</v-btn>
      </v-card>
    </v-card>
  </v-container>
</template>
