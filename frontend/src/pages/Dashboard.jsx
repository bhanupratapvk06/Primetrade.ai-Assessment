import Layout from "../components/Layout";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import AdminUsers from "../components/AdminUsers";

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchNotes = async () => {
        const res = await api.get("/notes");
        setNotes(res.data);
    };

    useEffect(() => { fetchNotes(); }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">
                {user?.role === "admin" ? "Admin Dashboard" : "My Notes"}
            </h1>

            <NoteForm refresh={fetchNotes} />
            <NotesList notes={notes} refresh={fetchNotes} />

            {user?.role === "admin" && (
                <div className="mt-10 p-4 bg-yellow-100 rounded-lg">
                    <h2 className="font-semibold">Admin Privileges</h2>
                    <p className="text-sm">You can view and manage all users' notes.</p>
                </div>
            )}
            {user?.role === "admin" && <AdminUsers />}
        </Layout>
    );
}