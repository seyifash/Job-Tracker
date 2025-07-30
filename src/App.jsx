import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // adjust path if needed
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';

// Move this ABOVE App
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
