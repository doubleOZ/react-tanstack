import axios from "axios";

export default axios.create({
  // baseURL: "https://covid19.ddc.moph.go.th/api",
  baseURL: "https://www.cmuccdc.org/api/ccdc",
  headers: {
    "Content-type": "application/json"
  }
});