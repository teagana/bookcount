import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getAllBooks, destroyBook } from "./api";

export default function Booklist() {
  const [books, setBooks] = useState();

  useEffect(() => {
    getAllBooks().then((books) => {
      console.log("books", books);
      setBooks(books);
    });
  }, []);

  function deleteBook(id) {
    console.log("delete book function called");
    destroyBook(id).then((response) => {
      console.log(response);

      // refresh the books
      getAllBooks().then((books) => {
        setBooks(books);
      });
    });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-left">books i've read:</h3>
        <div id="list">
          {books &&
            books.map((book) => {
              return (
                <div key={book.id} className="list-item mt-2">
                  <span>{book.title}</span>
                  {" | "}
                  <span>{book.author}</span>
                  {" | "}
                  <span>{book.genre}</span>
                  {" | "}
                  <span className="pr-1">{book.pagecount}</span>
                  {" / "}
                  <span
                    className="text-danger delete-link"
                    onClick={() => deleteBook(book.id)}
                  >
                    delete
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
