import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export function AdminLoginpage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location?.state?.email || "");
  const [password, setPassword] = useState(location?.state?.password || "");

  function loginFunction() {
    axios
      .post("http://localhost:3000/user/login", { email, password })
      .then((res) => {
        if (!res.data.user) {
          toast.error("Login failed");
          return;
        }

        localStorage.setItem("token", res.data.token);

        if (res.data.user.type == "admin") {
          toast.success("Login Successfull");
          navigate("/myadmin/dashboard");
        } else {
          toast.error("Unauthorized user");
          return;
        }
      });
  }

  useEffect(() => {
    if (location?.state?.email && location?.state?.password) {
      loginFunction();
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block font-medium text-gray-400">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-green-800 text-white font-semibold py-2 rounded-lg hover:bg-green-900 transition"
              onClick={loginFunction}>
              Login
            </button>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 p-4 text-center">
        <p className="text-sm">
          © 2025 Book Availability Check System. All rights reserved.
        </p>
        <p className="text-sm">Design and developed by Sumudu Kulathunga.</p>
      </footer>
    </div>
  );
}
