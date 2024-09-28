import './App.css';
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user, setLoginUser] = useState(null);

  const updateUser = (user) => {
    setLoginUser(user);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Homepage user={user} updateUser={updateUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              user && user._id ? (
                <Navigate to="/" />
              ) : (
                <Login updateUser={updateUser} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user && user._id ? (
                <Navigate to="/" />
              ) : (
                <Register />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
