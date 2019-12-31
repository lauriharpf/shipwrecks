import axios from "axios";

const buildCsrfHeaders = () => {
  const headerName = document.getElementById("_csrf_header").content;
  const csrfToken = document.getElementById("_csrf").content;

  return { [headerName]: csrfToken };
};

const post = (url, data) =>
  axios.post(url, data, { headers: buildCsrfHeaders() });

export default {
  getShipwrecks: () => axios.get("/api/shipwrecks"),
  login: idToken => post("/api/login", idToken),
  logout: () => post("/api/logout")
};
