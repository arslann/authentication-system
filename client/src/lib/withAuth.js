import { useRouter } from 'next/navigation'; // Use next/router instead of next/navigation
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
      // Redirect unauthenticated users to the login page
      if (!user) {
        router.replace('/');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.replace('/');
      }
    }, [user, allowedRoles, router]);

    if (!user) {
      return null; // You can render a loading state or something else here.
    }

    if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
      return <WrappedComponent {...props} />;
    }
  };
};

export default withAuth;
