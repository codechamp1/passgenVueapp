import axios from "axios";

const BASE_URL = "https://passgen-jade.vercel.app";

export async function getPassword(params) {
  return await axios
    .get(BASE_URL + "/passgen/generate", { params })
    .then(res => res.data);
}
