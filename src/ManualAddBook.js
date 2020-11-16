import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { createBook } from "./api";
import Navbar from "./Navbar";

export default function ManualAddBook() {
  const location = useLocation();
  let history = useHistory();

  let titleState = "";
  let authorState = "";
  let genreState = "";
  let pagecountState = "";

  // if there is state passed in from the modal, capture it
  if (typeof location.state !== "undefined") {
    // console.log(typeof location.state);
    titleState = location.state.title;
    authorState = location.state.author;
    genreState = location.state.genre;
    pagecountState = location.state.pagecount;
  }

  // use states for all four inputs
  const [title, setTitle] = useState(titleState);
  const [author, setAuthor] = useState(authorState);
  const [genre, setGenre] = useState(genreState);
  const [pagecount, setPagecount] = useState(pagecountState);

  console.log("genre equals empty string", genre === "");

  // use states for all four possible errors
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [pagecountError, setPagecountError] = useState("");

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

    if (typeof title === "undefined" || title.trim() === "") {
      setTitleError("this is a required field");
    } else {
      setTitleError("");
    }

    if (typeof author === "undefined" || author.trim() === "") {
      setAuthorError("this is a required field");
    } else {
      setAuthorError("");
    }

    if (typeof genre === "undefined" || genre.trim() === "") {
      setGenreError("this is a required field");
    } else {
      setGenreError("");
    }
    // make sure every input isn't empty
    // setTitleError(
    //   typeof title !== "undefined" && title.length > 0
    //     ? ""
    //     : "this is a required field"
    // );
    // setAuthorError(
    //   typeof author !== "undefined" && author.length > 0
    //     ? ""
    //     : "this is a required field"
    // );
    // setGenreError(
    //   typeof genre !== "undefined" && genre.length > 0
    //     ? ""
    //     : "this is a required field"
    // );

    if (typeof pagecount === "undefined" || isNaN(pagecount)) {
      // check to make sure it's not an empty string
      if (pagecount.trim() === "") {
        setPagecountError("this is a required field");
      }
      // a string of something that isn't a number
      else {
        setPagecountError("pagecount must be a number");
      }
      // check to make sure it's not an empty string
    } else {
      setPagecountError("");
    }

    // make sure the pagecount entry is a number (if it's not not a number, then it is a number)
    // setPagecountError(!isNaN(pagecount) ? "" : "pagecount must be a number");
    // // if pagecount is empty it wouldn't be a number, so overwrite NaN error if applicable
    // setPagecountError(
    //   typeof pagecount !== "undefined" && pagecount.length > 0
    //     ? ""
    //     : "this is a required field"
    // );

    console.log("title error", titleError);
    console.log("author error", authorError);
    console.log("genre error", genreError);
    console.log("pagecount error", pagecountError);

    // if any error was created
    if (
      titleError !== "" ||
      authorError !== "" ||
      genreError !== "" ||
      pagecountError !== ""
    ) {
      console.log("ERROR");
    }

    // no errors; create book with API call
    else {
      // reset all errors
      setTitleError("");
      setAuthorError("");
      setGenreError("");
      setPagecountError("");

      // create timestamp
      const today = new Date(Date.now());

      // createBook API call!!
      createBook({
        title: JSON.stringify(title),
        author: JSON.stringify(author),
        genre: JSON.stringify(genre),
        pagecount,
        timestamp: today,
      }).then((response) => {
        // tell the home page the user just successfully added a book
        history.push("/", {
          successNotif: true,
        }); // go back to home page
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-center">enter your book's info:</h3>
        <div className="mt-3">
          <form id="manualentry" className="mx-auto" onSubmit={handleSubmit}>
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
              <small id="error" className="text-danger">
                {titleError}
              </small>
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
              <small id="error" className="text-danger">
                {authorError}
              </small>
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
              {/* error if nothing put in this input */}
              <small id="error" className="text-danger">
                {genreError}
              </small>
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
              <small id="error" className="text-danger">
                {pagecountError}
              </small>
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
