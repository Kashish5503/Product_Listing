import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
