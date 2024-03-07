import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'src/store/userStore';

/**
 * Higher-order component for protecting routes.
 * @param children - The child components.
 */
const Protected = ({ children }: { children: ReactNode }) => {
  const { isUserLoggedIn } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/login');
    }
  }, [isUserLoggedIn, navigate]);
  if (!isUserLoggedIn()) {
    return null;
  }
  return children;
};

export default Protected;
