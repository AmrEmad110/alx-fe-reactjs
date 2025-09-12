import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Counter from "./components/Counter";


function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Amr Emad" age="22" bio="Frontend developer passionate about React and web development." />
      <MainContent />
      <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Simple Counter App</h1>
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
