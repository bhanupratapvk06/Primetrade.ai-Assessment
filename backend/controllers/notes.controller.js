import Note from "../models/Note.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content required" });
        }

        const note = await Note.create({
            title,
            content,
            owner: req.user.id
        });

        return res.status(201).json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create note" });
    }
};


export const getNotes = async (req, res) => {
    try {
        let notes;

        if (req.user.role === "admin") {
            notes = await Note.find().populate("owner", "username email");
        } else {
            notes = await Note.find({ owner: req.user.id });
        }

        return res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch notes" });
    }
};


export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (req.user.role !== "admin" && note.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed to edit this note" });
        }

        if (title !== undefined) note.title = title;
        if (content !== undefined) note.content = content;

        await note.save();

        return res.status(200).json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update note" });
    }
};


export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (req.user.role !== "admin" && note.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed to delete this note" });
        }

        await note.deleteOne();

        return res.status(200).json({ message: "Note deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete note" });
    }
};