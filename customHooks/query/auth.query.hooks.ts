import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/gloBalHooks";
import {
  loginProps,
  profileProps,
  registerProps,
} from "@/typeScript/auth.interface";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  allProfileDetails,
  loginFn,
  registerFn,
} from "@/api/funcTions/auth.api";
import toast from "react-hot-toast";

export const loginMutation = (): UseMutationResult<loginProps, unknown> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();
  return useMutation<loginProps, void, unknown>({
    mutationFn: loginFn,
    onSuccess: (res) => {
      const { token, status, message, data } = res || {};
      console.log(data);
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Login successfully");
      } else {
        toast.error(message || "Login failed.");
      }

      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
    onError: (error: any) => {
      toast.error("Login failed. Try again.");
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
  });
};

export const registerMutation = (): UseMutationResult<
  registerProps,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();
  return useMutation<registerProps, void, unknown>({
    mutationFn: registerFn,
    onSuccess: (res) => {
      const { token, status, message, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Registration successful");
      } else {
        toast.error(message || "Registration failed.");
      }

      queryClient.invalidateQueries({ queryKey: ["REGISTER"] });
    },
    onError: (error: any, variables, context) => {
      toast.error("Registration failed. Try again.");
      queryClient.invalidateQueries({ queryKey: ["REGISTER"] });
    },
  });
};

export const allProfileQuery = (): UseQueryResult<profileProps, unknown> => {
  return useQuery({
    queryKey: ["PROFILEDETAILS"],
    queryFn: allProfileDetails,
  });
};
