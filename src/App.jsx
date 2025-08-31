import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import DashboardPage from "./pages/DashboardPage";
import './index.css';

const Private = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → signin page */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Auth routes */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <Private>
              <DashboardPage />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
