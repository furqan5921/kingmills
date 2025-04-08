import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import { AuthProvider, useAuth } from './contextAPI/AuthContext';
import Layout from './pages/Layout';
import { SidebarProvider } from './contextAPI/sidebarContext';
import AdminLogin from './pages/Login';
import AdminRandomNumbers from './pages/RandomNumber';
import GetBetData from './pages/ManageBets';
import AdminReferralCodes from './pages/ReferalId';

const App = () => {
  const { isAuthenticated } = useAuth(); // Access authentication state directly

  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            {/* Login Route */}

            <Route path="/" element={<AdminLogin />} />
            <Route path="/" element={<Layout />}>
              <Route
                path="/admin/dashboard"
                element={<Dashboard />}
              />
            
              <Route
                path="/admin/random-numbers"
                element={<AdminRandomNumbers />}
              />
              <Route
                path="/admin/manage-bets"
                element={<GetBetData />}
              />
              <Route
                path="/admin/raferalId"
                element={<AdminReferralCodes />}
              />
            </Route>
            {/* Redirect to login if no match */}
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>

        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default App;
