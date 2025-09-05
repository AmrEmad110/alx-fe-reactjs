// src/App.jsx

import React from 'react';                            // استيراد React (للوضوح)
import './App.css';                                   // استيراد ملف التنسيقات لو موجود
import WelcomeMessage from './components/WelcomeMessage'; // استيراد المكوّن اللي عملناه
import Header from './components/Header'; // استيراد المكوّن اللي عملناه

function App() {                                      // تعريف المكوّن الرئيسي App
  return (
    <div>                                             {/* غلاف التطبيق */}
      <h1>تطبيقي الأول</h1>                            {/* ممكن تغير العنوان براحتك */}
      <WelcomeMessage />                              {/* هنا نعرض المكوّن المستورد */}
    </div>
  );
}

export default App;                                   // تصدير App عشان main.jsx يرندرها
