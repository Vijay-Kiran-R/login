import React from "react";
import "./homepage.css";

const Homepage = ({ user, updateUser }) => {
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            updateUser({});
        }
    };

    return (
        <div className="homepage">
            <h1>Welcome, {user.name || "User"}!</h1>
            <p>You are now logged in. Explore the educational platform.</p>
            <div className="button" onClick={handleLogout}>Logout</div>
        </div>
    );
};

export default Homepage;
