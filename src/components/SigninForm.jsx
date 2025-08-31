import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SigninForm() {
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", otp: "", remember: false });
    const [stepOtp, setStepOtp] = useState(false);
    const [sending, setSending] = useState(false);
    const [err, setErr] = useState("");
    const [showOtp, setShowOtp] = useState(false);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const sendOtp = async () => {
        setErr("");
        setSending(true);
        try {
            if (!/^\S+@\S+\.\S+$/.test(form.email))
                throw new Error("Enter a valid email");
            await api.post("/auth/send-otp", { email: form.email });
            setStepOtp(true);
        } catch (e) {
            setErr(e?.response?.data?.message || e.message);
        } finally {
            setSending(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            if (!form.otp) throw new Error("Enter OTP sent to your email");
            const { data } = await api.post("/auth/login-otp", {
                email: form.email,
                otp: form.otp,
            });
            localStorage.setItem("token", data.token);

            if (form.remember) {
                localStorage.setItem("rememberMe", "true");
            } else {
                localStorage.removeItem("rememberMe");
            }

            nav("/dashboard");
        } catch (e) {
            setErr(e?.response?.data?.message || e.message);
        }
    };

    return (
        <div className="w-full max-w-sm text-center md:text-left">
            <div className="flex md:hidden justify-center items-center mb-6">
                <img src="/top.png" alt="logo" className="h-6 w-auto mr-2" />
                <span className="font-bold">HD</span>
            </div>

            <h2 className="text-3xl font-bold mb-2">Sign In</h2>
            <p className="text-gray-500 mb-8">
                Please login to continue to your account.
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={onChange}
                    required
                    disabled={stepOtp}
                />
                {stepOtp && (
                    <div className="relative">
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            name="otp"
                            placeholder="OTP"
                            type={showOtp ? "text" : "password"}
                            value={form.otp}
                            onChange={onChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowOtp(!showOtp)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                )}

                {stepOtp && (
                    <div className="text-left">
                        <button
                            type="button"
                            onClick={sendOtp}
                            className="text-blue-500 text-sm hover:underline"
                            disabled={sending}
                        >
                            Resend OTP
                        </button>
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        checked={form.remember}
                        onChange={onChange}
                        className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                        Keep me logged in
                    </label>
                </div>

                {!stepOtp ? (
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                        onClick={sendOtp}
                        disabled={sending}
                    >
                        {sending ? "Sending OTP..." : "Get OTP"}
                    </button>
                ) : (
                    <button
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                        type="submit"
                    >
                        Sign In
                    </button>
                )}
            </form>
            {err && <div className="text-red-500 mt-4">{err}</div>}
            <p className="text-gray-500 mt-6">
                Need an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                    Create one
                </Link>
            </p>
        </div>
    );
}
