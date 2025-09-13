import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchBox } from "../components/search";
import { FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export function HomePage() {
  const [loading, setLoading] = useState("loading");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";

      return;
    } else {
      if (loading == "loading") {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "books/view")
          .then((res) => {
            setBooks(res.data.list);
            setLoading("loaded");
          });
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
    toast.success("Logged out successfully");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg relative">
        <div className="container mx-auto px-4 pr-16 md:pr-4">
          <h1 className="text-lg md:text-2xl font-bold text-center">
            Book Availability Check System
          </h1>
        </div>
        <div className="absolute top-4 right-4">
          <button
            className="bg-red-900 md:px-4 md:py-2 px-2 py-1 rounded hover:bg-red-800 hover:scale-105 transition font-semibold cursor-pointer"
            onClick={logout}>
            <FaSignOutAlt className="inline  " />
          </button>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <SearchBox />
        </div>
      </div>

      {/* /* Main Content */}
      <main className="flex-grow container mx-auto px-2 md:px-4 py-8 ">
        <div className="w-full  md:w-4/5 mx-auto">
          {loading == "loading" && (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-b-blue-500 border-l-blue-500 border-t-blue-400 border-r-gray-600 rounded-full animate-spin" />
            </div>
          )}

          {loading == "loaded" && (
            <div className="space-y-4">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 ">
                  <div className="flex flex-col gap-4 items-start">
                    <div>
                      <span className="text-gray-400 text-sm">Book Name:</span>
                      <p className="text-white font-semibold text-xl">
                        {book.bookName}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">
                        Description:
                      </span>
                      <p className="text-gray-300">{book.description}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Author:</span>
                      <p className="text-gray-300 font-semibold">
                        {book.author}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Pages:</span>
                      <p className="text-gray-300 font-semibold">
                        {book.pages}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">Price:</span>
                        <p className="text-gray-300 font-semibold text-lg">
                          Rs: {book.price}
                        </p>
                      </div>
                      <span
                        className={`px-2 font-semibold text-lg py-1 rounded ${
                          book.available
                            ? "bg-green-800 text-white"
                            : "bg-red-800 text-white"
                        }`}>
                        {book.available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
