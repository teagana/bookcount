import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getAllBooks, destroyBook } from "./api";
import { ToastContainer, toast } from "react-toastify";

export default function Booklist() {
  const [books, setBooks] = useState();

  // delete notification
  const successfulDeletionNotif = () => toast("successfully deleted book!");

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
        successfulDeletionNotif(); // notify of successful deletion
      });
    });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <ToastContainer />
        <h3 className="text-left">books i've read:</h3>
        <div id="list">
          {books &&
            books.map((book) => {
              return (
                // replace is to make sure JSON stringify doesn't leave
                // extra quotes in the list
                <div key={book.id} className="list-item mt-2">
                  <span>{book.title.replace(/"/g, "")}</span>
                  {" | "}
                  <span>{book.author.replace(/"/g, "")}</span>
                  {" | "}
                  <span>{book.genre.replace(/"/g, "")}</span>
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
