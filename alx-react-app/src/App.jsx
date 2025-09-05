import React from 'react';   // استيراد React
import Header from './components/Header';        // استيراد Header
import MainContent from './components/MainContent';  // استيراد MainContent
import Footer from './components/Footer';        // استيراد Footer

function App() {
  return (
    <div>
      <Header />       {/* يعرض العنوان */}
      <MainContent />  {/* يعرض المحتوى */}
      <Footer />       {/* يعرض الفوتر */}
    </div>
  );
}

export default App;
