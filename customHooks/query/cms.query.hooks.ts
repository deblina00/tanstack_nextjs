import { Cookies } from "react-cookie";
import {
  createProps,
  deleteProps,
  detailsProps,
  updateProps,
} from "@/typeScript/cms.interface";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/gloBalHooks";
import { createProductFn } from "@/api/funcTions/create.api";
import { deleteProductFn } from "@/api/funcTions/delete.api";

import {
  allProductsAPICall,
  allProductsDetails,
} from "@/api/funcTions/list.api";
import { listProps } from "@/typeScript/cms.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { updateProductFn } from "@/api/funcTions/update.api";
import toast from "react-hot-toast";

export const allProductsQuery = (
  page: number,
  perPage: number
): UseQueryResult<listProps, unknown> => {
  return useQuery({
    queryKey: ["LISTPRODUCTS", page, perPage],
    queryFn: () => allProductsAPICall(page, perPage),
  });
};

export const fetchProductsQuery = (
  id: string | number
): UseQueryResult<detailsProps, unknown> => {
  return useQuery({
    queryKey: ["PRODUCT-DETAILS", id],
    queryFn: () => allProductsDetails(`${id}`),
    enabled: !!id,
  });
};

export const createMutation = (): UseMutationResult<createProps, unknown> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<createProps, void, unknown, FormData>({
    mutationFn: createProductFn,
    onSuccess: (res) => {
      const { token, status, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        toast.error("Product creation failed. Please try again.");
      }
      queryClient.invalidateQueries({ queryKey: ["CREATE"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    },
  });
};

export const deleteMutation = (): UseMutationResult<
  deleteProps,
  unknown,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<deleteProps, unknown, unknown>({
    mutationFn: deleteProductFn,
    onSuccess: (res) => {
      const { status, user, token } = res || {};
      if (status === 200 && token) {
        toast.success("Product deleted successfully!");
        if (token) {
          cookie.set("token", token, { path: "/", secure: true });
          localStorage.setItem("user", JSON.stringify(user));
        }
      } else {
        toast.error("Product deletion failed or no status returned.");
      }
      queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    },
  });
};

export const updateMutation = (): UseMutationResult<
  updateProps,
  unknown,
  FormData,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  // const cookie = new Cookies();

  return useMutation<updateProps, unknown, FormData>({
    mutationFn: updateProductFn,
    onSuccess: (res) => {
      const { token, status, user } = res || {};
      if (status === 200) {
        toast.success("Product Update successfully");
      } else {
        toast.error("Failed.Try again");
      }
      queryClient.invalidateQueries({ queryKey: ["UPDATE"] });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    },
  });
};
