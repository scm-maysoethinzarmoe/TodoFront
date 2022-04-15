<template>
  <div class="form-group">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <input
          type="text"
          class="form-control my-1"
          placeholder="Enter title"
          v-model="todo.title"
        />
        <textarea
          class="form-control my-1"
          placeholder="Enter description"
          v-model="todo.description"
        ></textarea>
        <input
          type="button"
          class="btn btn-success my-2"
          value="Edit"
          @click="editTodo"
        />
        <input
          type="button"
          class="btn btn-secondary my-2 mx-2"
          value="Clear"
          @click="clearForm"
        />
        <input type="hidden" v-model="todo.id" />
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TodoEdit",
  data() {
    return {};
  },
  computed: {
    ...mapState(["todo", "todoList"]),
  },
  methods: {
    ...mapActions(["getTodoList", "clearTodo"]),
    async editTodo() {
      if (!this.validateForm()) {
        alert("Please enter title and description");
      } else {
        await this.$store.dispatch("editTodo");
        this.refreshList();
      }
    },
    validateForm() {
      if (!this.todo.title || !this.todo.description) {
        return false;
      }
      return true;
    },
    refreshList() {
      this.getTodoList();
      this.clearTodo();
    },
    clearForm() {
      this.clearTodo();
    },
  },
};
</script>
