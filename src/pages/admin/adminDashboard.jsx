import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from "react-icons/fa";

export function AdminDashboard() {
  const token = localStorage?.getItem("token");
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books/view")
      .then((result) => {
        setBooks(result.data.list);
      })
      .catch((e) => {
        toast.error("Error loading books");
      })
      .finally(() => {
        setLoading(false);
        setChanged(false);
      });
  }, [changed]);

  function popup(book) {
    setBookDetails(book);
  }

  function closePopup() {
    setBookDetails(null);
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/myadmin/login");
    toast.success("Logged out successfully");
  }

  function getAvailableBookCount() {
    return books.filter((book) => book.available == true).length;
  }
  function getUnavailableBookCount() {
    return books.filter((book) => book.available == false).length;
  }

  function getAllBookCount() {
    return books.length;
  }

  function deleteBook(book) {
    const bookId = book.bookId;
    axios
      .delete("http://localhost:3000/books/" + bookId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setChanged(true);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header Section  */}
      <header className="bg-gray-800 p-4 shadow-md">
        <h1 className="text-lg md:text-2xl font-bold text-center">
          Admin Dashboard
        </h1>
        <div className="absolute top-4 right-4">
          <button
            className="bg-red-900 px-2 py-1 md:px-4 md:py-2 rounded hover:bg-red-800 hover:scale-105 transition font-semibold cursor-pointer"
            onClick={logout}>
            <FaSignOutAlt className="inline mr-2" />
          </button>
        </div>
      </header>
      <div className="flex-grow p-6">
        {loading ? (
          <div className="w-[50px] h-[50px] border-4 border-b-blue-900 border-l-blue-900 border-t-blue-800 border-r-white rounded-full animate-spin mx-auto" />
        ) : (
          <div className="w-full">
            <div className="flex justify-end items-center mb-4">
              <Link to="/myadmin/dashboard/addbook">
                <button className="text-white bg-blue-600 px-2 md:px-4 md:py-2 py-1 rounded hover:bg-blue-700 hover:scale-105 transition font-semibold flex items-center space-x-2">
                  <FaPlus />
                  <span className="cursor-pointer">Add a new book</span>
                </button>
              </Link>
            </div>

            <div className=" text-white p-4 text-start flex flex-col md:flex-row md:items-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
              <h2 className="text-lg font-semibold bg-green-950 px-3 py-1 rounded mr-5">
                Total Books: {getAllBookCount()}
              </h2>
              <h2 className="text-lg font-semibold  bg-gray-700 px-3 py-1 rounded mr-5">
                Available Books: {getAvailableBookCount()}
              </h2>
              <h2 className="text-lg font-semibold  bg-gray-700 px-3 py-1 rounded mr-5">
                Unavailable Books: {getUnavailableBookCount()}
              </h2>
            </div>
            {/* Table */}
            <table className="w-full text-left border-collapse border border-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="border border-gray-700 px-4 py-2">Book ID</th>
                  <th className="border border-gray-700 px-4 py-2">
                    Book Name
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Available
                  </th>
                  <th className="border border-gray-700 px-4 py-2">Pages</th>
                  <th className="border border-gray-700 px-4 py-2">Price</th>
                  <th className="border border-gray-700 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr
                    key={book.bookId}
                    className="hover:bg-gray-800 border border-gray-700 ">
                    <td className="border border-gray-700 px-4 py-2">
                      {book.bookId}
                    </td>
                    <td
                      className="border border-gray-700 px-4 py-2 text-blue-400 cursor-pointer"
                      onMouseEnter={() => popup(book)}
                      onMouseLeave={closePopup}>
                      {book.bookName}
                    </td>
                    {book.available == true ? (
                      <td className="border border-gray-700 px-4 py-2 text-green-500 font-semibold">
                        Yes
                      </td>
                    ) : (
                      <td className="border border-gray-700 px-4 py-2 text-red-500 font-semibold">
                        No
                      </td>
                    )}

                    <td className="border border-gray-700 px-4 py-2">
                      {book.pages}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {book.price}
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        className="hover:scale-105 rounded bg-orange-800 text-white px-3 py-1 font-semibold flex items-center space-x-2 cursor-pointer"
                        onClick={() => {
                          navigate("/myadmin/editbook", {
                            state: {
                              bookId: book.bookId,
                              bookName: book.bookName,
                              description: book.description,
                              price: book.price,
                              author: book.author,
                              pages: book.pages,
                              available: book.available,
                            },
                          });
                        }}>
                        <FaEdit className="text-sm md:text-base" />
                      </button>
                      <button
                        className="rounded bg-red-800 opacity-75 text-white px-2 md:px-3 py-1 font-semibold flex items-center space-x-1 cursor-pointer"
                        onClick={() => {
                          const overlay = document.createElement("div");
                          overlay.className =
                            "fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center p-4";
                          overlay.style.zIndex = "9999";

                          const modal = document.createElement("div");
                          modal.className =
                            "bg-gray-800 text-white rounded p-4 md:p-6 shadow-lg max-w-xs md:max-w-sm w-full mx-4";
                          modal.innerHTML = `
                            <div class="mb-4">
                              <p class="text-base md:text-lg font-bold">Delete book</p>
                              <p class="text-xs md:text-sm mt-2">Are you sure you want to delete "<span class='font-semibold'></span>"?</p>
                            </div>
                            `;
                          const nameSpan = modal.querySelector("span");
                          if (nameSpan) nameSpan.textContent = book.bookName;

                          const btnContainer = document.createElement("div");
                          btnContainer.className =
                            "flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3";

                          const cancelBtn = document.createElement("button");
                          cancelBtn.className =
                            "bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 md:py-1 rounded text-sm md:text-base";
                          cancelBtn.textContent = "Cancel";

                          const confirmBtn = document.createElement("button");
                          confirmBtn.className =
                            "bg-red-600 hover:bg-red-700 text-white px-3 py-2 md:py-1 rounded text-sm md:text-base";
                          confirmBtn.textContent = "Delete";

                          btnContainer.appendChild(cancelBtn);
                          btnContainer.appendChild(confirmBtn);
                          modal.appendChild(btnContainer);
                          overlay.appendChild(modal);
                          document.body.appendChild(overlay);

                          const removeModal = () => {
                            if (overlay && overlay.parentNode)
                              overlay.parentNode.removeChild(overlay);
                            window.removeEventListener("keydown", onKey);
                          };

                          const onKey = (e) => {
                            if (e.key === "Escape") removeModal();
                          };
                          window.addEventListener("keydown", onKey);
                          overlay.addEventListener("click", (e) => {
                            if (e.target === overlay) removeModal();
                          });

                          cancelBtn.addEventListener("click", removeModal);

                          confirmBtn.addEventListener("click", () => {
                            deleteBook(book);
                            removeModal();
                          });
                        }}>
                        <FaTrash className="text-sm md:text-base" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Popup Section */}
        {bookDetails ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950 text-white px-6 py-4 rounded shadow-lg z-50">
            <p className="font-bold text-lg">{bookDetails.bookName}</p>
            <p>{bookDetails.description}</p>
          </div>
        ) : null}
      </div>
      <div className="flex justify-end mr-5 mb-5">
        <Link to={"/myadmin/register"}>
          <button className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-red-950 hover:scale-105 font-semibold flex items-center space-x-2 cursor-pointer">
            <FaPlus />
            <span>Add New Admin</span>
          </button>
        </Link>
      </div>
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
