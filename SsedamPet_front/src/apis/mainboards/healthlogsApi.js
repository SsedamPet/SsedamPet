import { api } from "../../configs/axiosConfig";

export const getHealthLog = () => {
  return api.get("/api/main/dashboard");
};
