import React from "react";
import UserContext from "./UserContext";
import UserProfile from "./UserProfile";

function App() {
  const user = { name: "Amr", age: 22 };

  return (
    <UserContext.Provider value={user}>
      <div>
        <h1>Welcome to the App</h1>
        <UserProfile />
      </div>
    </UserContext.Provider>
  );
}

export default App;
