import React, { useState } from "react";
import Navbar from "./Navbar";

export default function ManualAddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [pagecount, setPagecount] = useState("");

  // functions to handle state for inputs
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function handleGenreChange(event) {
    setGenre(event.target.value);
  }

  function handlePagecountChange(event) {
    setPagecount(event.target.value);
  }

  // handle submission of manual add book form
  function handleSubmit(event) {
    event.preventDefault();

    // make sure every input isn't empty
    // make sure the pagecount entry is a number
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-center">enter your book's info:</h3>
        <div className="mt-3">
          <form id="manualentry" className="mx-auto">
            <div className="form-group">
              <label htmlFor="title">title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
              {/* error if nothing put in this input */}
              <small id="error" className="text-danger"></small>
            </div>
            <div className="form-group">
              <label htmlFor="author">author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={author}
                onChange={handleAuthorChange}
              />
              {/* error if nothing put in this input */}
              <small id="error" className="text-danger"></small>
            </div>
            <div className="form-group">
              <label htmlFor="genre">genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                value={genre}
                onChange={handleGenreChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pagecount">pagecount</label>
              <input
                type="text"
                className="form-control"
                id="pagecount"
                value={pagecount}
                onChange={handlePagecountChange}
              />
              {/* error if nothing put in this input or if it's not a positive integer */}
              <small id="error" className="text-danger"></small>
            </div>
            <div className="text-center mt-5">
              <button
                id="manual-submit"
                type="submit"
                className="btn btn-primary"
                onSubmit={handleSubmit}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
