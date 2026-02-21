import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/auth/admin/users");
            setUsers(res.data);
            setOpen(true);
        } catch (err) {
            alert("Not authorized");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <button
                onClick={fetchUsers}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
                {loading ? "Loading..." : "View All Users"}
            </button>

            {open && (
                <div className="mt-5 bg-white shadow rounded-xl p-4">
                    <h2 className="text-lg font-semibold mb-3">Registered Users</h2>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-gray-600">
                                <th className="text-left py-2">Username</th>
                                <th className="text-left py-2">Email</th>
                                <th className="text-left py-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} className="border-b">
                                    <td className="py-2">{u.username}</td>
                                    <td className="py-2">{u.email}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded text-xs ${u.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}