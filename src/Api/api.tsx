import axios from "axios";
import { API_URI } from "../apiUrl";
export const axiosRequest = axios.create({
  baseURL:API_URI
});
