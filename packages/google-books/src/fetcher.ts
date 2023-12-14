import axios from "axios";
import { BASE_URL } from "./constants";

// Create a reusable axios instance using the base url
export const googleBooksApi = axios.create({
  baseURL: BASE_URL,
});
