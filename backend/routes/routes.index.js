import express from "express";
import userRouter from "./routes.users.js";
import notesRouter from "./routes.notes.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/notes", notesRouter);

export default router;