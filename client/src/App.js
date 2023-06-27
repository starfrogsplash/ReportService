import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/Signup';
import Login from './components/Login';
import SearchReport from './components/SearchReport';
import UserReports from './components/UserReports';
import CreateReport from './components/CreateReport';
import AuthRouter from './components/Auth';
import NavBar from './components/NavBar';
import UserDetailedReport from './components/UserDetailedReport'

const AuthCreateReport = AuthRouter(CreateReport);
const ViewUserReports = AuthRouter(UserReports);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/search-report" element={<SearchReport />} />
              <Route path="/create-report" element={<AuthCreateReport />} />
              <Route path="/user-reports" element={<ViewUserReports />} />
              <Route path="/report/:id" element={<UserDetailedReport />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;