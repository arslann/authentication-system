import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);

    // Redirect unauthenticated users to the login page
    if (!user) {
      router.replace('/');
      return null; // Or display a loading spinner
    }

    // Check if the user has the required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.replace('/');
      return null; // Or display a "Permission denied" message
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
