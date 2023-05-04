import React from 'react'
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Task from './components/task/Task';
import Navbar from './components/layout/navbar/Navbar';
import TaskReport from './components/task/TaskReport';
import Profile from './components/profile/Profile';
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react"
import UpdateTask from './components/task/UpdateTask';


function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    localStorage.setItem("authKey", isAuthenticated);
    localStorage.setItem("authEmail", user.email);
  }

  var checkKey = localStorage.getItem("authKey") ?? false;

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-task" element={
            <ProtectedRoute redirect="/" isAuthenticated={checkKey}>
              <Task />
            </ProtectedRoute>
          } />
          <Route path="/update-task/:taskId" element={
            <ProtectedRoute redirect="/" isAuthenticated={checkKey}>
              <UpdateTask />
            </ProtectedRoute>
          } />
          <Route path="/task-report" element={
            <ProtectedRoute redirect="/" isAuthenticated={checkKey}>
              <TaskReport />
            </ProtectedRoute>
          } />
          <Route path="/me" element={
            <ProtectedRoute redirect="/" isAuthenticated={checkKey}>
              <Profile isLoading={isLoading} isAuthenticated={isAuthenticated} user={user} />
            </ProtectedRoute>
          } />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
