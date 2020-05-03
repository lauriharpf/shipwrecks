import axios from "axios";
import { Ship } from "./models/";

const getShipwrecks: () => Promise<Ship[]> = async () => {
  const response = await axios.get("/api/shipwrecks");
  return response.data;
};

export default {
  getShipwrecks,
};
