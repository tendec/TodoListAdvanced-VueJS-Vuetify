export default class itemTodo {
  constructor(content, priority) {
    this.content = content;
    this.priority = priority;
    this.code = Math.random();
    this.done = false;
    this.remove = false;
  }
}
