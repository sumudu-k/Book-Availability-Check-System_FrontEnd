import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export function EditBook() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const bookData = location.state;
  const bookId = bookData.bookId;

  console.log("myy" + bookData);
  console.log(bookId);
  const [bookName, setBookName] = useState(bookData.bookName);
  const [description, setDescription] = useState(bookData.description);
  const [price, setPrice] = useState(bookData.price);
  const [author, setAuthor] = useState(bookData.author);
  const [pages, setPages] = useState(bookData.pages);
  const [available, setAvailable] = useState(bookData.available);

  const updateData = {
    bookId: bookId,
    bookName: bookName,
    description: description,
    price: price,
    author: author,
    pages: pages,
    available: available,
  };

  function updateBook() {
    if (
      !bookName ||
      !description ||
      !price ||
      !author ||
      !pages ||
      !available
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (isNaN(price)) {
      toast.error("Price must be a number");
      return;
    }
    if (isNaN(pages)) {
      toast.error("Pages must be a number");
      return;
    }
    axios
      .put(import.meta.env.VITE_BACKEND_URL + "books/" + bookId, updateData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        toast.success(result.data.message);
        navigate("/myadmin/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-lg md:text-2xl font-bold text-center">
            Update Book
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block font-medium text-gray-400">
                Book Name
              </label>
              <input
                type="text"
                placeholder="Book name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookData.bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Description{" "}
              </label>
              <textarea
                placeholder="Book description"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookData.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Book Author
              </label>
              <input
                type="text"
                placeholder="Book author"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookData.author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Book Price
              </label>
              <input
                type="text"
                placeholder="Book price"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookData.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Book Pages
              </label>
              <input
                type="text"
                placeholder="Book pages"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookData.pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-400">
                Availability
              </label>
              <select
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookData.available}
                onChange={(e) => setAvailable(e.target.value)}>
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>

            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                updateBook();
                console.log("button clicked");
              }}>
              Update Book
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
