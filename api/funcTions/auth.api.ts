import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";

import { endPoints } from "../endPoints/endPoints";
import {
  loginProps,
  profileProps,
  registerProps,
} from "@/typeScript/auth.interface";

export const loginFn: MutationFunction<loginProps> = async (payload) => {
  const res = await axiosInstance.post<loginProps>(
    endPoints.auth.login,
    payload
  );
  console.log(res, "loginres");
  return res.data;
};

export const registerFn: MutationFunction<registerProps> = async (payload) => {
  const res = await axiosInstance.post<registerProps>(
    endPoints.auth.register,
    payload
  );
  console.log(res, "registerres");
  return res.data;
};

export const allProfileDetails = async (): Promise<profileProps> => {
  try {
    const res = await axiosInstance.get<{ data: profileProps }>(
      endPoints.auth.profile
    );
    console.log("API Response:", res.data);

    if (!res.data || !res.data) {
      throw new Error("Profile data is missing.");
    }

    return res.data?.data ?? { id: 0, name: "", email: "" };
  } catch (error) {
    console.error("Error fetching profile details:", error);
    throw error;
  }
};
