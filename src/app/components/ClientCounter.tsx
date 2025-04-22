"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>🧮 클라이언트 카운터</h2>
      <button onClick={() => setCount(count + 1)}>클릭 수: {count}</button>
    </div>
  );
}
