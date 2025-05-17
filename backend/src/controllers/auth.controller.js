import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use, please use another one' });
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
        const newUser = await User.create({
            email,
            password,
            fullName,
            profilePic: randomAvatar,
        })

        try {
            const streamUser = await upsertStreamUser({
                id: newUser._id,
                name: newUser.fullName,
                image: newUser.profilePic || "",
            })
            console.log("Stream user created", streamUser);
        } catch (error) {
            console.error("Error creating Stream user", error);
        }
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.log("Error in signup", error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ success: true, user });

    } catch (error) {
        console.log("Error in login", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;
        const { fullName, bio, location, learningLanguage, nativeLanguage } = req.body;

        if(!fullName || !bio || !location || !learningLanguage || !nativeLanguage) {
            return res.status(400).json({ 
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !location && "location",
                    !learningLanguage && "learningLanguage",
                    !nativeLanguage && "nativeLanguage",
                ].filter(Boolean),
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true,
        }, { new: true });
        if(!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        try {
            const streamUser = await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });
            console.log("Stream user updated", streamUser);
        } catch (error) {
            console.error("Error updating Stream user", error);
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.log("Error in onboard", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
