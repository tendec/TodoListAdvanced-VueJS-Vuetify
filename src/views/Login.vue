<template>
  <v-container class="d-flex align-center justify-center" style="height: 100%">
    <v-card
      class="d-flex align-center justify-space-around"
      elevation="7"
      width="700px"
      height="400px"
    >
      <div class="text-h1 text-uppercase">Todo</div>
      <v-card
        class="d-flex flex-column align-center justify-space-around"
        flat
        width="300px"
        height="100%"
      >
        <div class="text-h4 text-uppercase text-center">Login</div>
        <v-form v-model="valid">
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            required
          />
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          />
        </v-form>
        <v-btn class="button" width="fit-content">Login</v-btn>
        <v-btn class="button" width="fit-content">Create New Account</v-btn>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      username: "",
      password: "",
    };
  },
};
</script>
