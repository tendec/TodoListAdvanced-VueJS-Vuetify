<template>
  <v-card
    class="d-flex align-center justify-center container"
    max-width="100vw"
    height="100vh"
    flat
    color="#ebebeb"
  >
    <v-card
      class="d-flex align-center justify-space-around animate__animated animate__bounceIn animate__faster ui-container"
      elevation="7"
      width="800px"
      height="400px"
      color="#0000"
    >
      <div class="text-uppercase todo-title">Todo</div>
      <v-card
        class="d-flex flex-column align-center justify-space-around ui-form"
        flat
        width="300px"
        height="100%"
        color="#0000"
      >
        <div class="text-uppercase text-center page-title">Login</div>
        <v-form ref="form">
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            @keyup.enter="loginBtn"
            :rules="[rules.required]"
            :error-messages="valid ? '' : 'Username or Password incorrect!'"
            @input="valid = true"
            color="#fece2f"
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
            @input="valid = true"
            counter
            validate-on-blur
            color="#fece2f"
          />
        </v-form>
        <v-btn
          class="button"
          width="fit-content"
          @click="loginBtn"
          color="#fece2f"
          small
          ><v-icon left small>fas fa-sign-in-alt</v-icon>Login</v-btn
        >
        <v-btn
          class="button"
          width="fit-content"
          @click="registerBtn"
          color="#fece2f"
          small
          ><v-icon left x-small>fas fa-user-plus</v-icon>Create Account</v-btn
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lemonada&display=swap");
.container {
  overflow: hidden;
  z-index: 0;
  background-image: linear-gradient(
    to bottom left,
    #fefefe,
    #fece2fbe
  ) !important;
}
.ui-container {
  background-image: linear-gradient(
    to top right,
    #fefefe,
    #fece2fbe
  ) !important;
  backdrop-filter: blur(10px);
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
  box-shadow: -5px -5px 5px 5px #ffffff24;
  background-color: #ebebeb;
  position: absolute;
  right: 112px;
  top: -12px;
  z-index: -4;
  background-image: linear-gradient(to bottom, #fefefe, #fece2fbe) !important;
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
  box-shadow: -5px -5px 5px 5px #ffffff54;
  background-color: #ebebeb;
  position: absolute;
  right: 100px;
  top: 169px;
  z-index: -4;
  background-image: linear-gradient(
    to bottom left,
    #fefefe,
    #fece2fbe
  ) !important;
}
</style>
