import React from "react";
import { observable, action, computed } from "mobx";

class TodoStore {
  @observable todoInput = React.createRef();
  @observable filter = "all";
  @observable beforeEditCache = "";
  @observable
  todos = [
    {
      title: "Todos item #1",
      completed: false,
      editing: false
    },
    {
      title: "Todos item #2",
      completed: false,
      editing: false
    },
    {
      title: "Todos item #3",
      completed: false,
      editing: false
    }
  ];

  @action
  addTodo = event => {
    if (event.key === "Enter") {
      const newTodo = this.todoInput.current.value;

      if (newTodo.trim().length === 0) {
        return;
      }

      this.todos.push({
        title: newTodo,
        completed: false,
        editing: false
      });

      this.todoInput.current.value = "";
    }
  };

  @action
  deleteTodo = index => {
    this.todos.splice(index, 1);
  };

  @action
  checkTodo = (todo, index, event) => {
    todo.completed = !todo.completed;
    this.todos.splice(index, 1, todo);
  };

  @action
  editTodo = (todo, index, event) => {
    todo.editing = true;
    this.beforeEditCache = todo.title;
    this.todos.splice(index, 1, todo);
  };

  @action
  doneEdit = (todo, index, event) => {
    todo.editing = false;

    if (event.target.value.trim().length === 0) {
      todo.title = this.beforeEditCache;
    } else {
      todo.title = event.target.value;
    }
  };

  @action
  cancelEdit = (todo, index, event) => {
    todo.title = this.beforeEditCache;
    todo.editing = false;

    this.todos.splice(index, 1, todo);
  };

  @action
  checkAllTodos = event => {
    event.persist();

    this.todos.forEach(todo => (todo.completed = event.target.checked));
  };

  @action
  updateFilter = filter => {
    this.filter = filter;
  };

  @action
  clearCompleted = () => {
    this.todos = this.todos.filter(todo => !todo.completed);
  };

  @computed
  get remaining() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  @computed
  get anyRemaining() {
    return this.remaining !== 0;
  }

  @computed
  get todosFiltered() {
    let filter = this.filter;
    console.log(filter);
    switch (filter) {
      case "active":
        return this.todos.filter(todo => !todo.completed);
        break;
      case "complete":
        return this.todos.filter(todo => todo.completed);
        break;
      default:
        return this.todos;
        break;
    }

    return this.todos;
  }

  @computed
  get todoCompletedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }
}

const store = new TodoStore();
export default store;
