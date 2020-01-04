import axios from "axios";

export default {
  getShipwrecks: () => axios.get("/api/shipwrecks")
};
