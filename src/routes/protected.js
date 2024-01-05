import AccessDenied from '../components/Common/AccessDenied';
import { useUserProfileContext } from '../context/userProfileProvider';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { userProfile } = useUserProfileContext();
  // If role doesn't allow access to page, redirect to access denied
  if (allowedRoles.includes(userProfile.role) && userProfile.isActive) {
    return children;
  }
  return <AccessDenied />;
}
export default ProtectedRoute;
