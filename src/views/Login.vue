<template>
  <v-container class="d-flex align-center justify-center">
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
        <v-form ref="form">
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            @keyup.enter="loginBtn"
            :rules="[rules.required]"
            :error-messages="valid ? '' : 'Username or Password incorrect!'"
          />
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="toggleEye"
            @keyup.enter="loginBtn"
            :type="!eye ? 'text' : 'password'"
            hint="At least 8 characters"
            :rules="[rules.required, rules.min]"
            :error-messages="valid ? '' : 'Username or Password incorrect!'"
            counter
            validate-on-blur
          />
        </v-form>
        <v-btn width="fit-content" @click="loginBtn">Login</v-btn>
        <v-btn width="fit-content" @click="registerBtn"
          >Create New Account</v-btn
        >
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      eye: true,
      valid: true,
      rules: {
        required: (value) => !!value || "Required!",
        min: (value) => (value || "").length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    loginBtn() {
      if (this.$refs.form.validate()) {
        let users = this.$store.state.users;
        let usernames = users.map((user) => user.username);
        let index = usernames.indexOf(this.username);
        let passwords = users.map((user) => user.password);
        if (index == -1) {
          this.valid = false;
        } else {
          if (passwords[index] !== this.password) {
            this.valid = false;
          } else {
            this.$store.commit("setActiveUser", users[index]);
            this.$store.commit("saveData");
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.$router.push({ name: "Main" });
          }
        }
      }
    },
    toggleEye() {
      this.eye = !this.eye;
    },
    registerBtn() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>
