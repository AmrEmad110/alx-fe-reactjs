import { useState } from "react";
import { advancedUserSearch } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await advancedUserSearch(username, location, repos);
    setResults(data.items);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <input type="text" placeholder="Username"
          value={username} onChange={(e) => setUsername(e.target.value)}
          className="border p-2" />
        <input type="text" placeholder="Location"
          value={location} onChange={(e) => setLocation(e.target.value)}
          className="border p-2" />
        <input type="number" placeholder="Min Repositories"
          value={repos} onChange={(e) => setRepos(e.target.value)}
          className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {results.map((user) => (
          <div key={user.id} className="border p-2">
            <img src={user.avatar_url} alt={user.login} width="80" />
            <h3>{user.login}</h3>
            <a href={user.html_url} target="_blank">View Profile</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
