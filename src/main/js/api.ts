import axios from "axios";
import { Ship } from "./Ship.types";

const getShipwrecks: () => Promise<Ship[]> = async () => {
  const response = await axios.get("/api/shipwrecks");
  return response.data;
};

export default {
  getShipwrecks,
};
