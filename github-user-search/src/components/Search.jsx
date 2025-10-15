import React, { useState } from "react";
import { fetchUserData, searchUsersAdvanced } from "../services/githubService";
import UserCard from "./UserCard.jsx";

export default function Search() {
  const [username, setUsername] = useState("");
  const [singleUser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // advanced search states
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [advancedResults, setAdvancedResults] = useState(null);
  const [advLoading, setAdvLoading] = useState(false);
  const [advError, setAdvError] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  async function handleSearch(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setSingleUser(null);

    try {
      const data = await fetchUserData(username.trim());
      setSingleUser(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdvancedSearch(e) {
    e.preventDefault();
    setAdvancedResults(null);
    setAdvLoading(true);
    setAdvError(null);
    setPage(1);

    try {
      const res = await searchUsersAdvanced({
        q: username.trim(),
        location: location.trim(),
        minRepos: Number(minRepos) || 0,
        page: 1,
        per_page: PER_PAGE
      });
      setAdvancedResults(res);
    } catch (err) {
      setAdvError(err);
    } finally {
      setAdvLoading(false);
    }
  }

  async function loadMore() {
    const next = page + 1;
    setAdvLoading(true);
    try {
      const res = await searchUsersAdvanced({
        q: username.trim(),
        location: location.trim(),
        minRepos: Number(minRepos) || 0,
        page: next,
        per_page: PER_PAGE
      });
      setAdvancedResults(prev => ({
        total_count: res.total_count,
        items: [...(prev?.items || []), ...res.items]
      }));
      setPage(next);
    } catch (err) {
      setAdvError(err);
    } finally {
      setAdvLoading(false);
    }
  }

  return (
    <div>
      {/* Basic Search */}
      <form className="mb-6" onSubmit={handleSearch}>
        <div className="flex gap-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="Enter GitHub username (e.g., torvalds)"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
        </div>
      </form>

      {loading && <div className="py-4 text-gray-600">Loading...</div>}
      {error && <div className="py-4 text-red-600">Looks like we cant find the user</div>}
      {singleUser && <UserCard user={singleUser} />}

      <hr className="my-6" />

      {/* Advanced Search */}
      <form onSubmit={handleAdvancedSearch} className="mb-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2"
            placeholder="Free text (username or keywords)"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2"
            placeholder="Location (e.g., Cairo)"
          />
          <input
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="border rounded p-2"
            placeholder="Min repos (e.g., 5)"
            type="number"
            min="0"
          />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Advanced Search</button>
        </div>
      </form>

      {advLoading && <div className="py-4 text-gray-600">Loading...</div>}
      {advError && <div className="py-4 text-red-600">Looks like we cant find the user</div>}

      {/* Advanced results list */}
      {advancedResults?.items?.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-3">Found {advancedResults.total_count} users (showing {advancedResults.items.length})</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advancedResults.items.map(item => (
              <div key={item.id} className="border rounded p-3 flex items-center gap-3">
                <img src={item.avatar_url} alt={item.login} className="w-12 h-12 rounded-full" />
                <div>
                  <a className="font-semibold" href={item.html_url} target="_blank" rel="noreferrer">{item.name || item.login}</a>
                  <div className="text-sm text-gray-500">
                    {item.location ? `Location: ${item.location}` : "Location: —"} • Repos: {item.public_repos ?? "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          {advancedResults.items.length < advancedResults.total_count && (
            <div className="mt-4">
              <button onClick={loadMore} className="px-4 py-2 bg-gray-200 rounded">{advLoading ? "Loading..." : "Load more"}</button>
            </div>
          )}
        </div>
      )}

      {/* no results message */}
      {advancedResults && advancedResults.items.length === 0 && !advLoading && (
        <div className="py-4 text-red-600">Looks like we cant find the user</div>
      )}
    </div>
  );
}
