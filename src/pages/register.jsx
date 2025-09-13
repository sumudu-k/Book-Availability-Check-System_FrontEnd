import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function register() {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("All fields are required ");
      return;
    }

    if (password != confirmPassword) {
      toast.error("Passwords do not match ");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long ");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    axios
      .post("http://localhost:3000/user/register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        type: "customer",
      })
      .then((res) => {
        if (res.data.message === "You are not allow to create admin accounts") {
          toast.error(res.data.message);
        } else if (
          res.data.message === "Already created an account.Please log in"
        ) {
          toast.error(res.data.message);
        } else if (res.data.message === "Account created") {
          toast.success(res.data.message);
          navigate("../login", {
            state: {
              email: email,
              password: password,
            },
          });
        } else {
          toast.error("Something went wrong.Please try again");
        }
      });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-lg md:text-2xl font-bold text-center">
            Book Available Check System
          </h1>
        </div>
      </header>

      <h1 className="text-center text-white font-bold text-xl mt-5 font-mono">
        Register
      </h1>

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
                value={firstname}
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
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">Email</label>
              <input
                type="email"
                placeholder="Enter email"
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
                placeholder="Enter password"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter password again"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <p className="text-gray-200">
              Already have an Account?{" "}
              <span className="underline text-blue-300">
                <Link to={"/login"}>Login</Link>
              </span>{" "}
              now
            </p>

            <button
              className="w-full bg-green-800 text-white font-semibold py-2 rounded-lg hover:bg-green-900 transition"
              onClick={register}>
              Register now
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
