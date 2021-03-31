export default class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  checkUser(username, password) {
    if (this.username == username && this.password == password) {
      return true;
    } else {
      return false;
    }
  }
}
