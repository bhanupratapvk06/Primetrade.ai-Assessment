import express from "express";
import { userRegister, userLogin, getUsers } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { loginValidation, registerValidation } from "../middlewares/authValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

/**
 * @swagger
 * /auth/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get("/admin/users", authMiddleware, roleMiddleware("admin"), getUsers);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, role]
 *             properties:
 *               username:
 *                 type: string
 *                 example: bhanu
 *               email:
 *                 type: string
 *                 example: bhanupratap@gmail.com
 *               password:
 *                 type: string
 *                 example: bhanu@123
 *               role:
 *                  type: String
 *                  enum: [user,admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerValidation, validate, userRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginValidation, validate, userLogin);

export default router;