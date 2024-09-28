import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        ageGroup: "",
        skills: "",
        learningReason: "",
        learningReasonOther: "",
        objective: "",
        objectiveOther: "",
        currentKnowledge: "",
        difficulty: 1,
        motivation: "",
        motivationOther: "",
        challenges: "",
        challengesOther: "",
        longTermGoal: "",
        longTermGoalOther: "",
        barriers: "",
        barriersOther: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!user.name) newErrors.name = "Name is required";
        if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Valid email is required";
        if (!user.password) newErrors.password = "Password is required";
        if (user.password !== user.reEnterPassword) newErrors.reEnterPassword = "Passwords do not match";
        if (!user.ageGroup) newErrors.ageGroup = "Age group is required";
        if (!user.skills) newErrors.skills = "Skills input is required";
        // Add validation for any other required fields

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const register = async () => {
        if (!validateForm()) {
            toast.error("Please fix the errors and submit again");
            return;
        }

        try {
            const res = await axios.post("http://localhost:9002/register", user);
            toast.success(res.data.message, {
                onClose: () => navigate("/login"),
            });
        } catch (err) {
            toast.error("An error occurred. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <input type="text" name="name" value={user.name} placeholder="Full Name" onChange={handleChange} />
                    {errors.name && <small>{errors.name}</small>}
                </div>
                <div>
                    <input type="email" name="email" value={user.email} placeholder="Email Address" onChange={handleChange} />
                    {errors.email && <small>{errors.email}</small>}
                </div>
                <div>
                    <input type="password" name="password" value={user.password} placeholder="Password (alphanumeric)" onChange={handleChange} />
                    {errors.password && <small>{errors.password}</small>}
                </div>
                <div>
                    <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
                    {errors.reEnterPassword && <small>{errors.reEnterPassword}</small>}
                </div>

                <h3>Age Group</h3>
                <select name="ageGroup" value={user.ageGroup} onChange={handleChange}>
                    <option value="">Select Age Group</option>
                    <option value="Below 18">Below 18</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65 and above">65 and above</option>
                </select>
                {errors.ageGroup && <small>{errors.ageGroup}</small>}

                <h3>What skill(s) are you interested in learning?</h3>
                <input type="text" name="skills" value={user.skills} placeholder="What skill(s) are you interested in learning?" onChange={handleChange} />
                {errors.skills && <small>{errors.skills}</small>}

                <h3>Why do you want to learn this skill?</h3>
                <select name="learningReason" value={user.learningReason} onChange={handleChange}>
                    <option value="">Select Reason</option>
                    <option value="Personal interest">Personal interest</option>
                    <option value="Career advancement">Career advancement</option>
                    <option value="Hobby">Hobby</option>
                    <option value="Other">Other (please specify)</option>
                </select>
                {user.learningReason === "Other" && (
                    <input type="text" name="learningReasonOther" placeholder="Please specify" onChange={handleChange} />
                )}

                <h3>What is your primary objective for learning this skill?</h3>
                <select name="objective" value={user.objective} onChange={handleChange}>
                    <option value="">Select Objective</option>
                    <option value="Start a new career">Start a new career</option>
                    <option value="Improve current skills">Improve current skills</option>
                    <option value="Personal development">Personal development</option>
                    <option value="Other">Other (please specify)</option>
                </select>
                {user.objective === "Other" && (
                    <input type="text" name="objectiveOther" placeholder="Please specify" onChange={handleChange} />
                )}

                <h3>How would you rate your current knowledge of the skill you want to learn?</h3>
                <select name="currentKnowledge" value={user.currentKnowledge} onChange={handleChange}>
                    <option value="">Select Knowledge Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <h3>What level of difficulty are you comfortable with?</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="range"
                        name="difficulty"
                        min="1"
                        max="10"
                        value={user.difficulty}
                        onChange={handleChange}
                        style={{ marginRight: '10px' }}
                    />
                    <span>{user.difficulty}</span>
                </div>

                <h3>What motivates you to learn this skill?</h3>
                <select name="motivation" value={user.motivation} onChange={handleChange}>
                    <option value="">Select Motivation</option>
                    <option value="Personal interest">Personal interest</option>
                    <option value="Job requirement">Job requirement</option>
                    <option value="Passion">Passion</option>
                    <option value="Other">Other (please specify)</option>
                </select>
                {user.motivation === "Other" && (
                    <input type="text" name="motivationOther" placeholder="Please specify" onChange={handleChange} />
                )}

                <h3>What challenges do you anticipate in your learning journey?</h3>
                <select name="challenges" value={user.challenges} onChange={handleChange}>
                    <option value="">Select Challenges</option>
                    <option value="Time management">Time management</option>
                    <option value="Understanding the material">Understanding the material</option>
                    <option value="Lack of resources">Lack of resources</option>
                    <option value="Staying motivated">Staying motivated</option>
                    <option value="Other">Other (please specify)</option>
                </select>
                {user.challenges === "Other" && (
                    <input type="text" name="challengesOther" placeholder="Please specify" onChange={handleChange} />
                )}

                <h3>What is your long-term goal related to this skill?</h3>
                <select name="longTermGoal" value={user.longTermGoal} onChange={handleChange}>
                    <option value="">Select Long-term Goal</option>
                    <option value="Career change">Career change</option>
                    <option value="Side project">Side project</option>
                    <option value="Hobby">Hobby</option>
                    <option value="Other">Other (please specify)</option>
                </select>
                {user.longTermGoal === "Other" && (
                    <input type="text" name="longTermGoalOther" placeholder="Please specify" onChange={handleChange} />
                )}

                <h3>What barriers to learning do you currently face?</h3>
                <select name="barriers" value={user.barriers} onChange={handleChange}>
                    <option value="">Select Barriers</option>
                    <option value="Lack of time">Lack of time</option>
                    <option value="Lack of resources">Lack of resources</option>
                    <option value="Family commitments">Family commitments</option>
                    <option value="Work commitments">Work commitments</option>
                    <option value="Other">Other (please specify)</option>
                </select>
                {user.barriers === "Other" && (
                    <input type="text" name="barriersOther" placeholder="Please specify" onChange={handleChange} />
                )}

                <div className="button-container">
                     <button type="button" className="button" onClick={register}>Register</button>
                     <div className="or-text">or</div>
                     <button type="button" className="button" onClick={() => navigate("/login")}>Login</button>
                </div>

            </form>

            {/* ToastContainer for displaying notifications */}
            <ToastContainer />
        </div>
    );
};

export default Register;