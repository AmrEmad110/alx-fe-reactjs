import { useState } from "react";
import { fetchUserData, advancedUserSearch } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [user, setUser] = useState(null);         // single user (simple search)
  const [results, setResults] = useState([]);     // list from advanced search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    setError(false);
    setResults([]);
    try {
      const data = await fetchUserData(username.trim());
      setUser(data);
    } catch (err) {
      setUser(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUser(null);
    try {
      const data = await advancedUserSearch(username.trim(), location.trim(), minRepos);
      setResults(data.items || []);
    } catch (err) {
      setResults([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">GitHub User Search</h1>

      {/* Basic Search */}
      <form onSubmit={handleBasicSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </form>

      {/* Advanced Search */}
      <form onSubmit={handleAdvancedSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        <input
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="col-span-1 sm:col-span-1 border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="col-span-1 border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Min repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="col-span-1 border rounded px-3 py-2"
        />
        <div className="col-span-1 sm:col-span-3">
          <button type="submit" className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Advanced Search</button>
        </div>
      </form>

      {/* Status */}
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">Looks like we cant find the user</p>}

      {/* Single user result (basic search) */}
      {user && (
        <div className="mt-4 p-4 border rounded flex items-center gap-4">
          <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full" />
          <div>
            <h2 className="font-semibold">{user.name || user.login}</h2>
            <p className="text-sm text-gray-600">{user.bio}</p>
            <p className="text-sm">Repos: {user.public_repos}</p>
            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-600">View Profile</a>
          </div>
        </div>
      )}

      {/* List results (advanced search) */}
      {results.length > 0 && (
        <div className="mt-6 grid gap-4">
          {results.map((u) => (
            <div key={u.id} className="p-4 border rounded flex items-center gap-4">
              <img src={u.avatar_url} alt={u.login} className="w-14 h-14 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <a href={u.html_url} target="_blank" rel="noreferrer" className="font-semibold text-blue-700">
                    {u.login}
                  </a>
                  <span className="text-sm text-gray-500">Score: {Math.round(u.score)}</span>
                </div>
                {/* location and repo count are not returned in search result item,
                    so we may show placeholders or fetch user details on demand */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
