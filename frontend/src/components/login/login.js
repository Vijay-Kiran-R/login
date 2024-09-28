import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ updateUser }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = () => {
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                if (res.data.user) {
                    toast.success("Login Successful!", {
                        onClose: () => {
                            updateUser(res.data.user);
                            navigate("/");
                        },
                    });
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                toast.error("An error occurred. Please try again.");
                console.error(err);
            });
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" />
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register")}>Register</div>

            {/* ToastContainer for displaying notifications */}
            <ToastContainer />
        </div>
    );
};

export default Login;
