import { createStore } from "vuex";
import TodoService from "../service/TodoService";

export default createStore({
  state: {
    todoList: [],
    todo: {
      id: 0,
      title: "",
      description: "",
      doneStatus: "0",
    },
  },
  actions: {
    async getTodoList({ commit }) {
      await TodoService.getTodoList()
        .then((response) => {
          commit("todoListSuccess", response.data.todoList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async saveTodo() {
      await TodoService.saveTodo(this.state.todo);
    },
    clearTodo() {
      this.state.todo = {
        id: 0,
        title: "",
        description: "",
        doneStatus: "0",
      };
    },
    async editDoneStatus({ dispatch }, id) {
      await TodoService.editDoneStatus(id, this.state.todo.doneStatus);
      dispatch("clearTodo");
    },
    getTodoById({ commit }) {
      TodoService.getTodoById(this.state.todo.id)
        .then((response) => {
          commit("todoSuccess", response.data.todoDto);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async editTodo() {
      await TodoService.editTodo(this.state.todo, this.state.todo.id);
    },
    async deleteTodo() {
      await TodoService.deleteTodo(this.state.todo.id);
    },
    async searchTodo({ commit }, searchData) {
      await TodoService.searchTodo(searchData)
        .then((response) => {
          commit("todoListSuccess", response.data.todoList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getTodoListByStatus({ commit }, doneStatus) {
      await TodoService.getTodoListByStatus(doneStatus)
        .then((response) => {
          commit("todoListSuccess", response.data.todoList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mutations: {
    todoListSuccess(state, todoList) {
      state.todoList = todoList;
    },
    todoSuccess(state, todo) {
      state.todo = todo;
    },
  },
});
