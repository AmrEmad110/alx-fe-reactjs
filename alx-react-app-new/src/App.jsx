import Header from './components/Header';
import MainContent from './components/MainContent';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import Counter from './components/Counter';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <UserProfile 
        name="Amr Emad" 
        age={22} 
        bio="I am a Computer Science graduate who loves React and Frontend development." 
      />
      {/* هنا ضفنا الـ Counter */}
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
