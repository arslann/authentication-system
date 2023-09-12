'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const router = useRouter();
    const { user, role } = useSelector((state) => state.auth);

    useEffect(() => {
      // Redirect unauthenticated users to the login page
      if (!user) {
        router.replace('/');
      }
      // Check if the user has the required role
      else if (allowedRoles.length > 0 && allowedRoles.includes(role)) {
        router.replace('/');
      }
    }, [user, role, allowedRoles, router]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
