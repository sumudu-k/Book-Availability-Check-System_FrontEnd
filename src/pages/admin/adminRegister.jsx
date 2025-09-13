import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AdminRegister() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const adminDetails = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    type: "admin",
  };

  async function register() {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("All fields are required ");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Enter a valid email ");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters ");
      return;
    }

    if (password != confirmPassword) {
      toast.error("Passwords do not match ");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "user/register",
        adminDetails,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Admin registered successfully");
      navigate("/myadmin/dashboard");
    } catch (e) {
      toast.error("Server error, try again later");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Register New Admin</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block font-medium text-gray-400">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-xs text-gray-400">
                (Password must be at least 6 characters)
              </span>
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter password again"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-green-800 text-white font-semibold py-2 rounded-lg hover:bg-green-900 transition"
              type="button"
              onClick={register}>
              Register Admin
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
