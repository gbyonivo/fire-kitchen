import axios from "axios";

export const KitchenAxios = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
