import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Shopping list
 *         content:
 *           type: string
 *           example: Buy milk and eggs
 *         owner:
 *           type: string
 *           example: 65f1a2b3c4d5e6f7890aaa11
 *         createdAt:
 *           type: string
 *           example: 2026-02-21T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           example: 2026-02-21T10:00:00.000Z
 */

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Note created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get notes (user gets own, admin gets all)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getNotes);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       403:
 *         description: Not allowed
 *       404:
 *         description: Note not found
 */
router.put("/:id", authMiddleware, updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     description: Only the note owner or an admin can delete this note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted
 *       403:
 *         description: Not allowed
 *       404:
 *         description: Note not found
 */
router.delete("/:id", authMiddleware, deleteNote);

export default router;