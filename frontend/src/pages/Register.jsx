import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "user"
    });

    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");
        setSuccess("");

        try {
            const res = await api.post("/auth/register", form);
            setSuccess(res.data.message || "Registered successfully!");
            setTimeout(() => nav("/login"), 1200);
        } catch (err) {
            setMsg(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form onSubmit={submit} className="card w-96 space-y-4">

                <h2 className="text-2xl font-bold text-center text-indigo-600">
                    Create Account
                </h2>

                <input
                    className="input"
                    placeholder="Username"
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />

                <input
                    className="input"
                    placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <select
                    className="input"
                    onChange={e => setForm({ ...form, role: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button className="btn w-full">Register</button>

                {msg && <p className="text-red-500 text-sm text-center">{msg}</p>}
                {success && <p className="text-green-600 text-sm text-center">{success}</p>}

                <div className="text-center pt-2 border-t">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                    </p>
                    <button
                        type="button"
                        onClick={() => nav("/login")}
                        className="mt-2 text-indigo-600 font-medium hover:underline"
                    >
                        Go to Login
                    </button>
                </div>

            </form>
        </div>
    );
}