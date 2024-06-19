import { useEffect, useState } from 'react';

export default function LogsPanel() {
  const [random, setRandom] = useState(4324);
  useEffect(() => {
    const interval = setInterval(() => {
      setRandom(Math.random());
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      LogsPanel
      {random}
    </div>
  );
}
