import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8082/ToDo/api",
  headers: {
    "Content-type": "application/json"
  }
});