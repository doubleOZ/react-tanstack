import { Station } from "../models/user";
import apiClient from "./api/http-common";

export const getAll = async (): Promise<Station[]> => {
  const res = await apiClient.get("/stations");
  return res.data as Station[];
};

export const getCurrentTime = (): Promise<number> => {
  return Promise.resolve(Date.now());
};

export const postCall = async (data: any) => {
  await apiClient.post("/xxx", data);
};
