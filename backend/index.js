import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected");
}).catch((error) => {
    console.log("DB connection error:", error);
    process.exit(1);
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    ageGroup: String,
    skills: String,
    learningReason: String,
    learningReasonOther: String, // For "Other" reason
    objective: String,
    objectiveOther: String,      // For "Other" objective
    currentKnowledge: String,
    difficulty: Number,
    motivation: String,
    motivationOther: String,     // For "Other" motivation
    challenges: String,
    challengesOther: String,     // For "Other" challenges
    longTermGoal: String,
    longTermGoalOther: String,   // For "Other" long-term goal
    barriers: String,
    barriersOther: String        // For "Other" barriers
});

// Create user model
const User = new mongoose.model("User", userSchema);

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send({ message: "Server error during login" });
    }
});

// Register Route
app.post("/register", async (req, res) => {
    const { 
        name, email, password, reEnterPassword, ageGroup, 
        skills, learningReason, learningReasonOther, objective, 
        objectiveOther, currentKnowledge, difficulty, motivation, 
        motivationOther, challenges, challengesOther, longTermGoal, 
        longTermGoalOther, barriers, barriersOther 
    } = req.body;

    // Check if passwords match
    if (password !== reEnterPassword) {
        return res.status(400).send({ message: "Passwords do not match" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already registered" });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            ageGroup,
            skills,
            learningReason,
            learningReasonOther,
            objective,
            objectiveOther,
            currentKnowledge,
            difficulty,
            motivation,
            motivationOther,
            challenges,
            challengesOther,
            longTermGoal,
            longTermGoalOther,
            barriers,
            barriersOther
        });

        await newUser.save();
        res.status(201).send({ message: "Successfully Registered, Please login now." });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send({ message: "Server error during registration" });
    }
});

// Start the server
app.listen(9002, () => {
    console.log("Backend started at port 9002");
});
