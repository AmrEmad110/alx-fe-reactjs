import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Amr Emad" age="22" bio="Frontend developer passionate about React and web development." />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
