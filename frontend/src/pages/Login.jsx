import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const nav = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            login(res.data.token);
            nav("/dashboard");
        } catch (err) {
            setMsg(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={submit} className="card w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Login</h2>

                <input className="input" placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })} />

                <input type="password" className="input" placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })} />

                <button className="btn w-full">Login</button>

                {msg && <p className="text-red-500 text-sm">{msg}</p>}
            </form>
        </div>
    );
}