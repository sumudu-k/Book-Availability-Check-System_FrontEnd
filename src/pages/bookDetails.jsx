import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `books/${bookId}`)
      .then((data) => setBook(data));
  }, [bookId]);

  if (!book) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{book.data.bookList[0].bookName}</h1>
      <p>{book.data.bookList[0].author}</p>
      <p>{book.data.bookList[0].pages} pages</p>
      <p>Rs.{book.data.bookList[0].price}</p>
    </div>
  );
}
