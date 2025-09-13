import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AddBook() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [available, setAvailable] = useState(true);

  const newBook = {
    bookId: bookId,
    bookName: bookName,
    description: description,
    price: price,
    author: author,
    pages: pages,
    available: available,
  };

  function addBook() {
    if (!bookId || !bookName || !description || !price || !author || !pages) {
      toast.error("Please fill all fields");
      return;
    }
    if (isNaN(bookId)) {
      toast.error("Book Id must be a number");
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
      .post("http://localhost:3000/books/add", newBook, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        toast.success(result.data.message);
        navigate("/myadmin/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-lg md:text-2xl font-bold text-center">
            Add New Book
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block font-medium text-gray-400">Book Id</label>
              <input
                type="text"
                placeholder="Book Id"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Book Name
              </label>
              <input
                type="text"
                placeholder="Book name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Description
              </label>
              <textarea
                placeholder="Book description"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Book Author
              </label>
              <input
                type="text"
                placeholder="Book author"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={author}
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
                defaultValue={price}
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
                defaultValue={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-400">
                Available
              </label>
              <select
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={available}
                onChange={(e) => setAvailable(e.target.value)}>
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>

            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={addBook}>
              Add Book
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
