import axios from "axios";

const env = process.env.NODE_ENV;

const baseURL = env === "development" ? "http://localhost:8080" : "";

export const api = axios.create({
  baseURL,
});
