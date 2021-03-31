<template>
  <v-container>
    <v-card class="d-flex align-center justify-center">
      <div class="text-h1 text-uppercase">Todo</div>
      <div class="d-flex flex-column justify-space-around">
        <div class="text-h4 text-uppercase text-center">Register</div>
        <v-form v-model="valid">
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            required
          />
          <v-text-field
            v-model="password"
            type="text"
            label="Password"
            required
          />
          <v-text-field
            v-model="cfpassword"
            type="text"
            label="Confirm password"
            required
          />
        </v-form>
        <v-btn class="button">Create</v-btn>
        <v-btn class="button">Back</v-btn>
      </div>
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
