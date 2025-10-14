import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";
const token = import.meta.env.VITE_APP_GITHUB_TOKEN || "";

const axiosInstance = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: token ? { Authorization: `token ${token}` } : {}
});

/**
 * fetchUserData - fetch a single user by username
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("username required");
  try {
    const res = await axiosInstance.get(`/users/${encodeURIComponent(username)}`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    const message = err?.response?.data?.message || err.message;
    const error = new Error(message);
    error.status = status;
    throw error;
  }
}

/**
 * searchUsersAdvanced - use GitHub search API with query parameters
 * options: { q: string, location: string, minRepos: number, page: number, per_page: number }
 * returns { total_count, items: [ { login, avatar_url, html_url, score, location, public_repos } ] }
 */
export async function searchUsersAdvanced({ q = "", location = "", minRepos = 0, page = 1, per_page = 10 }) {
  // Build query parts properly (space-separated qualifiers become + when sent as param)
  let parts = [];
  if (q) parts.push(q);
  if (location) parts.push(`location:${location}`);
  if (minRepos && Number(minRepos) > 0) parts.push(`repos:>${Number(minRepos)}`);

  const query = parts.length ? parts.join(" ") : "type:user";

  try {
    // Use the search API
    const res = await axiosInstance.get(`/search/users`, {
      params: { q: query, page, per_page }
    });

    const { total_count, items } = res.data;

    // For each item we may need more details (location, public_repos) — fetch in parallel but limit to per_page
    const limited = items.slice(0, per_page);
    const detailsPromises = limited.map((it) =>
      axiosInstance.get(`/users/${encodeURIComponent(it.login)}`)
        .then(r => ({
          login: it.login,
          id: it.id,
          avatar_url: it.avatar_url,
          html_url: it.html_url,
          score: it.score,
          location: r.data.location || null,
          public_repos: r.data.public_repos ?? null,
          name: r.data.name || null,
        }))
        .catch(() => ({
          // If details fetch fails, return basic item (still useful)
          login: it.login,
          id: it.id,
          avatar_url: it.avatar_url,
          html_url: it.html_url,
          score: it.score,
          location: null,
          public_repos: null,
          name: null,
        }))
    );

    const enriched = await Promise.all(detailsPromises);

    return { total_count, items: enriched };
  } catch (err) {
    const status = err?.response?.status;
    const message = err?.response?.data?.message || err.message;
    const error = new Error(message);
    error.status = status;
    throw error;
  }
}
