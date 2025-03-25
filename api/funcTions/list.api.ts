import { detailsProps, listProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";

export const allProductsAPICall = async (page: number, perPage: number) => {
  const res = await axiosInstance.post<listProps>(endPoints.pages.list, {
    page,
    perPage,
  });
  return res;
};

export const allProductsDetails = async (
  id: string
): Promise<detailsProps | null> => {
  const res = await axiosInstance.get<{ data: detailsProps }>(
    endPoints.pages.details + id
  );
  return res.data.data;
};
