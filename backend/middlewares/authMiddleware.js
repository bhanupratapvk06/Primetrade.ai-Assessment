import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};