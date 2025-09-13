import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function SearchBox() {
  const [book, setBook] = useState("");
  const navigate = useNavigate();

  function search() {
    if (!book.trim()) return;
    navigate("/books/view/" + book);
  }

  return (
    <div className="flex items-center bg-gray-700 rounded-lg border border-gray-600 p-2 shadow-lg">
      <input
        type="text"
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3 py-2"
        placeholder="Search books..."
        value={book}
        onChange={(e) => setBook(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && search()}
      />
      <FaSearch
        onClick={search}
        className="mr-3  cursor-pointer text-gray-400 hover:text-white transition-colors duration-200 ml-2 text-lg"
      />
    </div>
  );
}
