// src/components/Content.tsx
import { useState } from 'react';

const Content = () => {
  const [count, setCount] = useState(0);

  return (
    <main className="card mt-6 text-center">
      <button
        onClick={() => setCount((count) => count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        count is {count}
      </button>
    </main>
  );
};

export default Content;
