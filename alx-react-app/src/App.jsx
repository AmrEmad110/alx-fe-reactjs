import React from 'react';   // استيراد React
import WelcomeMessage from './components/WelcomeMessage';   // رسالة ترحيب
import Header from './components/Header';                   // الهيدر
import MainContent from './components/MainContent';         // المحتوى الرئيسي
import Footer from './components/Footer';                   // الفوتر
import UserProfile from './components/UserProfile';         // كارت المستخدم

// الكومبوننت الرئيسي بتاع التطبيق
function App() {
  return (
    <div>
      {/* رسالة الترحيب (Task 1) */}
      <WelcomeMessage />

      {/* هيدر + محتوى رئيسي + فوتر (Task 2) */}
      <Header />
      <MainContent />
      <Footer />

      {/* كارت المستخدم باستخدام props (Task 3) */}
      <UserProfile 
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />

      <UserProfile 
        name="Omar" 
        age="30" 
        bio="Software engineer who enjoys learning React" 
      />
    </div>
  );
}

// لازم نصدر الكومبوننت عشان يشتغل في المشروع
export default App;

