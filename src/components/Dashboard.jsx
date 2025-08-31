import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [err, setErr] = useState("");
    const nav = useNavigate();

    const load = async () => {
        try {
            const me = await api.get("/auth/me");
            setUser(me.data.user);
            const ns = await api.get("/notes");
            setNotes(ns.data.notes);
        } catch (e) {
            localStorage.removeItem("token");
            nav("/signin");
        }
    };

    useEffect(() => {
        load();
    }, []);

    const addNote = async () => {
        setErr("");
        try {
            const noteNumber = notes.length + 1;
            const newNote = { text: `Note ${noteNumber}` };
            const { data } = await api.post("/notes", newNote);
            setNotes([data.note, ...notes]);
        } catch (e) {
            setErr(e?.response?.data?.message || "Failed to add");
        }
    };

    const del = async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter((n) => n._id !== id));
        } catch (e) {
            setErr(e?.response?.data?.message || "Failed to delete");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        nav("/signin");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <img src="/top.png" alt="Logo" className="h-6 w-auto" />
                        <span className="text-lg font-semibold">Dashboard</span>
                    </div>
                    <button
                        onClick={logout}
                        className="text-blue-600 hover:underline"
                    >
                        Sign Out
                    </button>
                </div>
                <div className="bg-white border rounded-lg shadow p-4 mb-6">
                    <h3 className="font-semibold text-lg break-words">
                        Welcome, {user?.name || "User"} !
                    </h3>
                    <p className="text-gray-500 break-words">
                        Email: {user?.email || "xxxxxx@xxxx.com"}
                    </p>
                </div>
                <button
                    onClick={addNote}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg mb-6"
                >
                    Create Note
                </button>
                <div>
                    <h4 className="font-semibold text-lg mb-3">Notes</h4>
                    <ul className="space-y-3">
                        {notes.map((n) => (
                            <li
                                key={n._id}
                                className="flex justify-between items-center bg-white border rounded-lg shadow-sm p-3"
                            >
                                <span className="truncate max-w-[80%]">{n.text}</span>
                                <button
                                    onClick={() => del(n._id)}
                                    className="text-gray-600 hover:text-red-500 flex-shrink-0"
                                >
                                    🗑
                                </button>
                            </li>
                        ))}
                        {!notes.length && (
                            <div className="text-gray-400 text-sm">No notes yet.</div>
                        )}
                    </ul>
                </div>
                {err && <div className="text-red-500 mt-4 break-words">{err}</div>}
            </div>
        </div>
    );
}
