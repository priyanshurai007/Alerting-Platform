import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4001";
export const api = axios.create({ baseURL: API_BASE, headers: { "Content-Type": "application/json" } });

export async function fetchTeams() {
  return [{ id: "t-eng", name: "Engineering" }, { id: "t-mkt", name: "Marketing" }];
}
export async function fetchUsers() {
  return [
    { id: "u-alex", name: "Alex", teamId: "t-eng" },
    { id: "u-bella", name: "Bella", teamId: "t-mkt" },
    { id: "u-chen", name: "Chen", teamId: "t-eng" }
  ];
}
