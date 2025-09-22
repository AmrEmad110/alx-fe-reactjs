import { useState } from 'react';

function Counter() {
  // الحالة: العداد وقيمته
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current Count: {count}</p>
      
      {/* زرار زيادة */}
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {/* زرار نقصان */}
      <button onClick={() => setCount(count - 1)}>Decrement</button>

      {/* زرار تصفير */}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
