import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { GenerateToken } from "../utils/Token.js";

export const userRegister = async (req, res) => {
    try {
        const { username, email, password, role} = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "Please enter all the details." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            role: role
        });

        return res.status(201).json({ message: "User Registered Successfully!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Register failed" });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all the details." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }
        const token = GenerateToken(user);
        return res.status(200).json({ message: "User Logged In Successfully!",token: token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Loggin failed" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
};