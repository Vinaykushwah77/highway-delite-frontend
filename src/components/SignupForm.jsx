import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", dob: "", email: "", otp: "" });
  const [sending, setSending] = useState(false);
  const [stepOtp, setStepOtp] = useState(false);
  const [err, setErr] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      const { data } = await api.post("/auth/signup", form);
      localStorage.setItem("token", data.token);
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div className="w-full max-w-sm text-center md:text-left">
      <div className="flex justify-center md:hidden items-center mb-6">
        <img src="/top.png" alt="logo" className="h-6 w-auto mr-2" />
        <span className="font-bold">HD</span>
      </div>
      <h2 className="text-3xl font-bold mb-2">Sign up</h2>
      <p className="text-gray-500 mb-8">Sign up to enjoy the feature of HD</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={onChange}
          required
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="dob"
          type="date"
          value={form.dob}
          onChange={onChange}
          required
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />

        {stepOtp && (
          <div className="relative">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              name="otp"
              type={showOtp ? "text" : "password"} 
              placeholder="OTP"
              value={form.otp}
              onChange={onChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowOtp(!showOtp)}
            >
              {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        )}

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
            Sign up
          </button>
        )}
      </form>

      {err && <div className="text-red-500 mt-4">{err}</div>}

      <p className="text-gray-500 mt-6">
        Already have an account??{" "}
        <Link to="/signin" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
