<template>
  <div>
    <h3 class="text-center bg-success text-white">To do List</h3>
    <div class="my-5 mx-4 activeCard formBack">
      <div class="py-2" v-if="todo.id > 0">
        <TodoEdit />
      </div>
      <div class="py-2" v-else>
        <TodoCreate />
      </div>
    </div>

    <div class="my-5 mx-4 activeCard">
      <div class="row mx-4 my-3">
        <div class="col-2">
          <input
            type="text"
            v-model="searchValue"
            placeholder="Enter search data..."
            class="form-control"
            @keyup.enter="searchTodo"
          />
        </div>
        <div class="col-1">
          <input
            type="button"
            class="btn btn-success"
            value="Search"
            @click="searchTodo"
          />
        </div>
        <div class="col"></div>
        <div class="col-2">
          <select
            v-model="doneStatus"
            class="form-control"
            @change="searchByStatus"
          >
            <option value="">All</option>
            <option value="0">Undone</option>
            <option value="1">Done</option>
          </select>
        </div>
      </div>
      <div class="row mx-4" v-if="todoList.length > 0">
        <div class="col-3 my-2" v-for="(todo, index) in todoList" :key="index">
          <div
            class="card"
            :class="todo.doneStatus == '1' ? 'doneCard' : 'activeCard'"
          >
            <div class="card-body">
              <h5 class="card-title">
                {{ todo.title }}
              </h5>
              <p class="card-text">
                {{ todo.description }}
              </p>
              <div class="card-footer">
                <a
                  href="#"
                  class="text-success"
                  @click="changeDoneStatus(todo.id, '1')"
                  v-if="todo.doneStatus == '0'"
                  >Done</a
                >
                <a
                  href="#"
                  class="text-warning"
                  @click="changeDoneStatus(todo.id, '0')"
                  v-else
                  >Undone</a
                >
                <a
                  href="#"
                  class="text-primary m-2"
                  @click="getTodoById(todo.id)"
                  >Edit</a
                >
                <a href="#" class="text-danger" @click="deleteTodo(todo.id)"
                  >Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="alert alert-warning text-center mx-4" v-else>
        There is no data!
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TodoEdit from "./TodoEdit.vue";
import TodoCreate from "./TodoCreate.vue";

export default {
  name: "TodoList",
  components: {
    TodoEdit,
    TodoCreate,
  },
  data() {
    return {
      searchValue: "",
      doneStatus: "",
    };
  },
  created() {
    this.refreshList();
  },
  computed: {
    ...mapState(["todo", "todoList"]),
  },
  methods: {
    ...mapActions(["getTodoList", "editDoneStatus", "clearTodo", "getTodoListByStatus"]),
    async changeDoneStatus(id, doneStatus) {
      this.todo.doneStatus = doneStatus;
      await this.editDoneStatus(id);
      this.refreshList();
    },
    getTodoById(id) {
      this.todo.id = id;
      this.$store.dispatch("getTodoById");
    },
    async deleteTodo(id) {
      this.todo.id = id;
      await this.$store.dispatch("deleteTodo");
      this.refreshList();
    },
    refreshList() {
      this.getTodoList();
      this.clearTodo();
      this.clearSearchform();
    },
    searchTodo() {
      this.$store.dispatch("searchTodo", this.searchValue);
    },
    searchByStatus() {
      if (this.doneStatus) {
        this.getTodoListByStatus(this.doneStatus);
      } else {
        this.getTodoList()
      }
    },
    clearSearchform() {
      this.searchValue = "";
      this.doneStatus = "";
    },
  },
};
</script>
<style scope>
.doneCard {
  background-color: rgb(160, 155, 155) !important;
}
.activeCard {
  border: 1px solid green !important;
}

.formBack {
    background-color: rgb(187, 179, 179) !important;
}
</style>
