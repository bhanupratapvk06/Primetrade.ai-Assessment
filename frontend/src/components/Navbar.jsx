import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { token, logout, user } = useContext(AuthContext);
    const loc = useLocation();

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">

                <Link to="/" className="font-bold text-xl tracking-wide">
                    📝 NotesHub
                </Link>

                <div className="flex gap-3 items-center">

                    {!token ? (
                        <>
                            <Link
                                to="/register"
                                className={`px-4 py-2 rounded-lg transition ${loc.pathname === "/register"
                                        ? "bg-white text-indigo-600"
                                        : "hover:bg-indigo-500"
                                    }`}
                            >
                                Register
                            </Link>

                            <Link
                                to="/login"
                                className={`px-4 py-2 rounded-lg transition ${loc.pathname === "/login"
                                        ? "bg-white text-indigo-600"
                                        : "hover:bg-indigo-500"
                                    }`}
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-sm bg-indigo-700 px-3 py-1 rounded-full">
                                {user?.role}
                            </span>

                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}