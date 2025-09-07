import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import RegisterForm from "./components/RegisterForm";
import FeedbackForm from "./components/FeedbackForm";
import Login from "./components/Login";
import Logout from "./components/Logout";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/feedback"
            element={<FeedbackForm />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
