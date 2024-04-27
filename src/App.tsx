import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import {
  Analytics,
  Auth,
  ChangePassword,
  Employees,
  ForgotPassword,
  Login,
  Maps,
  Organizations,
  Profile,
  Register,
  TransportManagement,
  Users,
} from '@app/components';
import { Main } from '@app/layouts';

import './components/Auth/ChangePassword';

function App() {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Profile />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/transport" element={<TransportManagement />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
