import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protected';
import { roles } from '../constants/roles';
import MainLayout from '../components/Layout/MainLayout';
import LandingPage from '../features/LandingPage';
// import ManageUsers from '../features/ManageUsers';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          {/* <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={[roles.administrator]}>
                <ManageUsers />
              </ProtectedRoute>
            }
          /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
