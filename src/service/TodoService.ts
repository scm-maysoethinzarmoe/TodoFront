import http from "../http-common";

class TodoService {
  getTodoList() {
    return http.get("/todoList");
  }

  saveTodo(todo: object) {
    return http.post("/saveTodo", todo);
  }

  editDoneStatus(id: number, doneStatus: string) {
    return http.put("/doneEditTodo?id=" + id + "&doneStatus=" + doneStatus);
  }

  getTodoById(id: number) {
    return http.get("/todoDetail?id=" + id);
  }

  editTodo(todo: object, id: number) {
    return http.put("/editTodo?id=" + id, todo);
  }

  deleteTodo(id: number) {
    return http.delete("/deleteTodo?id=" + id);
  }

  searchTodo(searchValue: string) {
    return http.get("/todoList?searchValue=" + searchValue);
  }

  getTodoListByStatus(doneStatus: string) {
    return http.get("/getTodoListByStatus?doneStatus=" + doneStatus);
  }
}
export default new TodoService();
