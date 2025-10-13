const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

console.log("My GitHub Token is:", token);
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold">GitHub User Search</h1>
      <Search />
    </div>
  );
}

export default App;
