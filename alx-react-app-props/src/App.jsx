import ProfilePage from "./ProfilePage";
import UserContext from "./UserContext";

function App() {
  const userData = { name: "Amr Emad", email: "amr.emad@example.com" };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
