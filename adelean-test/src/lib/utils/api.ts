import { queryOptions } from "@tanstack/react-query";
import { getQueryClient } from "../get-query-client";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const getAllProducts = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");

      if (res.status === 200) {
        const json = await res.json();
        return json as Product[];
      } else {
        throw new Error("Could not fetch products");
      }
    },
  });
};

export const getProduct = (id: string) => {
  return queryOptions({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);

      if (res.status === 200) {
        const json = await res.json();
        return json as Product;
      } else {
        throw new Error("Could not find product");
      }
    },
  });
};

export const addProduct = async (product: Product) => {
  const queryClient = getQueryClient();

  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

  if (res.status === 201) {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  } else {
    throw new Error("Could not add product");
  }
};

export const updateProduct = async (product: Product) => {
  const queryClient = getQueryClient();

  const res = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

  if (res.status === 200) {
    queryClient.invalidateQueries({
      queryKey: [["product", product.id], ["products"]],
    });
  } else {
    throw new Error("Could not update product");
  }
};

export const deleteProduct = async (productId: number) => {
  const queryClient = getQueryClient();

  const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: "DELETE",
  });

  if (res.status === 200) {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  } else {
    throw new Error("Could not delete product");
  }
};
