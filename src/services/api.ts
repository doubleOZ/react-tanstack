import { Station, StationValue } from "../models/user";
import apiClient from "./api/http-common";

export const StationService = {
  // Get all stations
  getAll: async () => {
    const response = await apiClient.get<Station[]>("/stations");
    return response.data;
  },
  // Get specific station details
  getStationById: async (id: number) => {
    const response = await apiClient.get<Station>(`/station/${id}`);
    return response.data;
  },

  // Get air quality values for a specific device
  getStationValues: async (dustboyId: string) => {
    const response = await apiClient.get<StationValue>(`/value/${dustboyId}`);
    return response.data;
  },
};

// export const getAll = async (): Promise<Station[]> => {
//   const res = await apiClient.get("/stations");
//   return res.data as Station[];
// };

// export const getCurrentTime = (): Promise<number> => {
//   return Promise.resolve(Date.now());
// };

// export const postCall = async (data: any) => {
//   await apiClient.post("/xxx", data);
// };
