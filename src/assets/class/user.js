export default class User {
  constructor(username, password, cards) {
    this.username = username;
    this.password = password;
    this.cards = cards;
  }
  checkUser(username, password) {
    if (this.username == username && this.password == password) {
      return true;
    } else {
      return false;
    }
  }
}
