import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export function SearchResults() {
  const { bookName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState("loading");

  function searchedCount() {
    return books.length;
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/books/view/" + bookName)
      .then((res) => {
        setBooks(res.data.bookList || []);
        setLoading("loaded");
      })
      .catch(() => {
        setLoading("loaded");
      });
  }, [bookName]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-xl lg:text-2xl font-bold text-center">
            <Link to={"/"}>Book Availability Check System</Link>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-2 lg:px-4 py-8">
        <div className="w-full lg:w-4/5 mx-auto">
          <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-center">
            Search Results for "{bookName}" ( {searchedCount()} found )
          </h2>

          {loading === "loading" && (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-b-blue-500 border-l-blue-500 border-t-blue-400 border-r-gray-600 rounded-full animate-spin" />
            </div>
          )}

          {loading === "loaded" && (
            <>
              {books.length === 0 ? (
                <div className="text-center text-gray-400 text-xl">
                  No books found. Please try a different search term.
                </div>
              ) : (
                <div className="space-y-4">
                  {books.map((book, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                      <div className="flex flex-col gap-4 items-start">
                        <div>
                          <span className="text-gray-400 text-sm">
                            Book Name:
                          </span>
                          <p className="text-white font-semibold text-xl">
                            {book.bookName}
                          </p>
                        </div>
                        {book.description && (
                          <div>
                            <span className="text-gray-400 text-sm">
                              Description:
                            </span>
                            <p className="text-gray-300">{book.description}</p>
                          </div>
                        )}
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
                            <span className="text-gray-400 text-sm">
                              Price:
                            </span>
                            <p className="text-gray-300 text-lg font-semibold">
                              Rs: {book.price}
                            </p>
                          </div>
                          {book.available !== undefined && (
                            <span
                              className={`px-2 font-semibold text-lg py-1 rounded ${
                                book.available
                                  ? "bg-green-800 text-white"
                                  : "bg-red-800 text-white"
                              }`}>
                              {book.available ? "Available" : "Not Available"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
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
