// src/components/DashboardLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 

const DashboardLayout = ({ children }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
          navigate("/login");
        });
      };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Job Tracker</h1>
        <button className="text-sm bg-white rounded text-blue-400 px-4 py-2" onClick={handleLogout}>Logout</button>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
