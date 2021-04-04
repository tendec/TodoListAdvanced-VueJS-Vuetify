<template>
  <v-card
    class="d-flex align-center justify-center container"
    height="100vh"
    color="#ebebeb"
  >
    <v-card
      class="d-flex align-center justify-space-around animate__animated animate__bounceIn animate__faster ui-container"
      elevation="7"
      width="800px"
      height="400px"
      color="#f3f3f3"
    >
      <div class="text-uppercase todo-title">Todo</div>
      <v-card
        class="d-flex flex-column align-center justify-space-around ui-form"
        flat
        width="100%"
        height="100%"
        color="#f3f3f3"
      >
        <div class="text-uppercase text-center page-title">Register</div>
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
            color="#fece2f"
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
            color="#fece2f"
          />
          <v-text-field
            v-model="cfpassword"
            label="Re-password"
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
            color="#fece2f"
          />
        </v-form>
        <v-btn
          class="button"
          width="fit-content"
          @click="createBtn"
          color="#fece2f"
          small
          ><v-icon left x-small>fas fa-user-plus</v-icon>Create</v-btn
        >
        <v-btn
          class="button"
          width="fit-content"
          @click="backBtn"
          color="#fece2f"
          small
          ><v-icon left x-small>fas fa-arrow-left</v-icon>Back</v-btn
        >
      </v-card>
    </v-card>
    <div class="deco1"></div>
    <div class="deco2"></div>
    <div class="deco3"></div>
    <div class="deco4"></div>
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

<style scoped>
.container {
  overflow: hidden;
  z-index: 0;
}
.container::before {
  content: "";
  width: 400px;
  height: 500px;
  border-radius: 50%;
  background-color: #fece2f;
  position: absolute;
  left: -25px;
  top: -150px;
  transform: rotate(100deg);
}
.container::after {
  content: "";
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  background-color: #fece2f;
  position: absolute;
  right: -400px;
  top: 60px;
  z-index: -5;
}
.deco1 {
  width: 400px;
  height: 400px;
  border-radius: 50% !important;
  background-color: #ebebeb;
  position: absolute;
  right: 120px;
  top: -20px;
  z-index: -4;
}
.deco2 {
  width: 200px;
  height: 200px;
  border-radius: 50% !important;
  background-color: #fece2f;
  position: absolute;
  right: 36px;
  top: 62px;
  z-index: -3;
}
.deco3 {
  width: 400px;
  height: 600px;
  border-radius: 50% !important;
  background-color: #fece2f;
  position: absolute;
  right: 212px;
  top: 210px;
  z-index: -3;
}
.deco4 {
  width: 300px;
  height: 300px;
  border-radius: 50% !important;
  background-color: #ebebeb;
  position: absolute;
  right: 100px;
  top: 169px;
  z-index: -4;
}
</style>
