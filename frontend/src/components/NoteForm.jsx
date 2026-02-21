import { useState } from "react";
import api from "../api/axios";

export default function NoteForm({ refresh }) {
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");

  const create = async ()=>{
    await api.post("/notes",{title,content});
    setTitle(""); setContent("");
    refresh();
  };

  return (
    <div className="card space-y-3">
      <h3 className="font-semibold">Create Note</h3>
      <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
      <textarea className="input" value={content} onChange={e=>setContent(e.target.value)} placeholder="Content"/>
      <button onClick={create} className="btn">Add Note</button>
    </div>
  );
}