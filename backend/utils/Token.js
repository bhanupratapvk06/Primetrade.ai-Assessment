import jwt from "jsonwebtoken";

export const GenerateToken = (user) => {
    try {
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY missing in env");
        }

        const token = jwt.sign(
            { id: user._id ,role: user.role},
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        return token;
    } catch (error) {
        console.error("Token generation failed:", error.message);
        throw error;
    }
};

export const verifyToken = (token) => {
    try {
        if (!token) {
            throw new Error("Authorization token required");
        }

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY missing in env");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;

    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};