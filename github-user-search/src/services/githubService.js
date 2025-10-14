import axios from "axios";

const GITHUB_BASE = "https://api.github.com";
const token = import.meta.env.VITE_APP_GITHUB_API_KEY || "";

// axios instance to optionally include token
const api = axios.create({
  baseURL: GITHUB_BASE,
  headers: token
    ? { Authorization: `token ${token}` }
    : undefined,
});

// Fetch single user by username
export const fetchUserData = async (username) => {
  if (!username) throw new Error("username required");
  const res = await api.get(`/users/${username}`);
  return res.data;
};

// Advanced search: username, location, min repos
export const advancedUserSearch = async (username = "", location = "", minRepos = "") => {
  // build query
  const parts = [];
  if (username) parts.push(`${username}`);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);

  const q = parts.join("+") || "type:user";
  const res = await api.get(`/search/users`, {
    params: { q, per_page: 30 },
  });
  return res.data; // contains items array, total_count etc.
};
