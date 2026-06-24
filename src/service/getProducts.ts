import type { ProductsByStep } from "@/interface/selection.interface";
import axios from "axios";

type ProductsResponse = {
  products: ProductsByStep;
};

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>("/products.json");
  return response.data;
};
