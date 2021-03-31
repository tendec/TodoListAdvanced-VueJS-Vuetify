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
        <div class="text-h4 text-uppercase text-center">Register</div>
        <v-form>
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            :rules="[rules.required]"
            ref="username"
            @blur="checkUsername()"
          />
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="toggleEye"
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
            :type="!eye ? 'text' : 'password'"
            hint="At least 8 characters"
            :rules="[rules.required, rules.min]"
            counter
            ref="cfpassword"
            validate-on-blur
          />
        </v-form>
        <v-btn class="button" width="fit-content" @click="createBtnClick"
          >Create</v-btn
        >
        <v-btn class="button" width="fit-content" @click="backBtnClick"
          >Back</v-btn
        >
      </v-card>
    </v-card>
  </v-container>
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
      rules: {
        required: (value) => !!value || "Required!",
        min: (value) => value.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    createBtnClick() {
      if (this.password !== this.cfpassword) {
        alert("Password not match!");
        this.cfpassword = "";
        this.$refs.cfpassword.focus();
      } else {
        let user = new User(this.username, this.password);
        this.$store.commit("addNewUser", user);
        this.$store.commit("setActiveUser", user);
        this.$store.commit("saveData");
        this.username = "";
        this.password = "";
        this.cfpassword = "";
      }
    },
    checkUsername() {
      let users = this.$store.state.users;
      let usernames = users.map((i) => i.username);
      if (usernames.includes(this.username)) {
        alert("Username existed!");
        this.username = "";
        this.$refs.username.focus();
      }
    },
    toggleEye() {
      this.eye = !this.eye;
    },
    backBtnClick() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
