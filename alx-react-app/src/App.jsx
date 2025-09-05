import React from 'react';   // استيراد React
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>

       <UserProfile 
       name="Alice" 
       age="25" 
       bio="Loves hiking and photography" />       {/* يعرض الفوتر */}

    </div>
  );
}

export default App;
