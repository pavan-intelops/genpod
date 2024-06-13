import { useEffect, useState } from 'react';

const HydrationZustand = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (typeof window === 'undefined') {
    return null;
  }
  if (!isHydrated) {
    return null;
  }
  return children;
};

export default HydrationZustand;
