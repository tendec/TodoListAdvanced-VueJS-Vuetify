export default class Card {
  constructor(title, todos) {
    this.title = title;
    this.todos = todos;
    this.code = Math.random();
  }
}
