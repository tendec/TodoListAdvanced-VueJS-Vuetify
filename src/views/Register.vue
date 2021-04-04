<template>
  <v-card class="d-flex align-center justify-center" height="100vh">
    <v-card
      class="d-flex align-center justify-space-around animate__animated animate__bounceIn animate__faster"
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
        <div class="text-h4 text-uppercase text-center">Register</div>
        <v-form ref="form">
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            @keyup.enter="createBtn"
            :rules="[rules.required]"
            :error-messages="valid ? '' : 'Username existed!'"
            @input="valid = true"
            @blur="checkUsername()"
          />
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="toggleEye"
            @keyup.enter="createBtn"
            :type="!eye ? 'text' : 'password'"
            hint="At least 8 characters"
            :rules="[rules.required, rules.min]"
            counter
            validate-on-blur
          />
          <v-text-field
            v-model="cfpassword"
            label="Confirm password"
            :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="toggleEye"
            @keyup.enter="createBtn"
            :type="!eye ? 'text' : 'password'"
            hint="At least 8 characters"
            :rules="[
              rules.required,
              rules.min,
              rules.matching(password, cfpassword),
            ]"
            counter
            validate-on-blur
          />
        </v-form>
        <v-btn class="button" width="fit-content" @click="createBtn"
          ><v-icon left x-small>fas fa-user-plus</v-icon>Create</v-btn
        >
        <v-btn class="button" width="fit-content" @click="backBtn"
          ><v-icon left x-small>fas fa-arrow-left</v-icon>Back</v-btn
        >
      </v-card>
    </v-card>
  </v-card>
</template>
<script>
import User from "../assets/class/user.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      cfpassword: "",
      eye: true,
      valid: true,
      rules: {
        required: (value) => !!value || "Required!",
        min: (value) => (value || "").length >= 8 || "Min 8 characters!",
        matching: (value1, value2) =>
          value1 === value2 || "Password not match!",
      },
    };
  },
  methods: {
    createBtn() {
      if (this.$refs.form.validate()) {
        let user = new User(this.username, this.password, []);
        this.$store.commit("addNewUser", user);
        this.$store.commit("setActiveUser", user);
        this.$store.commit("saveData");
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
        this.$router.push({ name: "Main" });
      }
    },
    checkUsername() {
      let users = this.$store.state.users;
      let usernames = users.map((user) => user.username);
      if (usernames.includes(this.username)) {
        this.valid = false;
      }
    },
    toggleEye() {
      this.eye = !this.eye;
    },
    backBtn() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
