import { client } from "../../api/client";
const API_URL = "/api/funds";

async function read(signal) {
  try {
    return await client.get(API_URL, { signal });
  } catch (error) {
    return Promise.reject(error);
  }
}

export { read };
