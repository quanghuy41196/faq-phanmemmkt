import { productsApi } from "@/services/axios/products";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllProducts(params?: any) {
  return useQuery({
    queryKey: [productsApi.queryKey, params],
    queryFn: async () => await productsApi.getAll(params),
    retry: 0,
  });
}

