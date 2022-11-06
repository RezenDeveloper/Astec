import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: process.env.APP_URL
})