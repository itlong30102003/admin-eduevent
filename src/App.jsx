import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import UserManagementScreen from './screens/UserManagementScreen';
import OrganizerManagementScreen from './screens/OrganizerManagementScreen';
import Navbar from './component/Navbar';
import EventManagementScreen from './screens/EventManagementScreen';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="screen-container">{children}</div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/users" element={<UserManagementScreen />} />
          <Route path="/organizers" element={<OrganizerManagementScreen />} />
          <Route path="/event" element={<EventManagementScreen/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
