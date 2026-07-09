const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const emailPattern = /^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }


        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}


exports.getCurrentUser = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}