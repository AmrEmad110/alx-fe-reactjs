// src/components/WelcomeMessage.jsx

import React from 'react'; // (اختياري في نسخ React الحديثة، بس بنحطه للوضوح)

function WelcomeMessage() {                       // تعريف المكوّن
  return (
    <div>                                        {/* غلاف المكوّن */}
      <h1>Hello everyone, I am learning React at ALX!</h1> {/* سطر H1 بعد التعديل */}
      <p>This is a simple JSX component.</p>     {/* الفقرة الأصلية */}
      <p>I am learning about JSX!</p>            {/* الفقرة الجديدة المطلوبة */}
    </div>
  );
}

export default WelcomeMessage;                   // تصدير المكوّن لاستخدامه في App.jsx
