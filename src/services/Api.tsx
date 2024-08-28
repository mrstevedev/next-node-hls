import axios from "axios";
import { ROUTE } from "@/constants/index";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

/**
 * @param email
 * @param status
 * @returns void
 */
export async function subscribe(email: string, status: string) {
  const payload = JSON.stringify({ email, status });
  const response = await API.post(ROUTE.SUBSCRIBE, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
