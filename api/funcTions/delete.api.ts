import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { deleteProps } from "@/typeScript/cms.interface";
import { endPoints } from "../endPoints/endPoints";

export const deleteProductFn: MutationFunction<deleteProps> = async (
  payload
) => {
  const res = await axiosInstance.post<deleteProps>(
    endPoints.pages.delete,
    payload
  );
  // console.log(res, "loginres")
  return res.data;
};
