import { updateProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";
import { MutationFunction } from "@tanstack/react-query";

export const updateProductFn: MutationFunction<updateProps> = async (
  payload
) => {
  const res = await axiosInstance.post<updateProps>(
    endPoints.pages.update,
    payload
  );
  // console.log(res, "loginres")
  return res.data;
};
