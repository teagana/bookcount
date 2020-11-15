import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import { createBook } from "./api";

export default function ConfirmBookInfo({ onClose, bookInfo }) {
  let history = useHistory();

  // user indicated they wanted to change some of the book info;
  // take them to manual entry page and pre-fill applicable inputs
  function toManualEntry() {
    onClose();
    console.log("genres", bookInfo.Topics);
    history.push("/add_book_manual", {
      title: bookInfo.Title,
      author: bookInfo.Author,
      genre: bookInfo.Topics ? bookInfo.Topics[0] : "",
      pagecount: bookInfo.NumberOfPages ? Number(bookInfo.NumberOfPages) : 0,
    }); // go to manual add page with parameters
  }

  // user doesn't want to change any of bookmooch's info
  // take them back to the homepage
  function acceptBookInfo() {
    // date shenanigans
    const today = new Date(Date.now());
    console.log(today.getMonth(), today.getFullYear());

    createBook({
      title: bookInfo.Title,
      author: bookInfo.Author,
      genre: bookInfo.Topics ? bookInfo.Topics[0] : "None",
      timestamp: today,
      pagecount: bookInfo.NumberOfPages ? Number(bookInfo.NumberOfPages) : 0,
    }).then((response) => {
      onClose();
      history.push("/"); // go back to home page
    });
  }

  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* info from bookmooch api call */}
            <div className="modal-body">
              <p>
                <span className="font-weight-bold">title:</span>{" "}
                {bookInfo && bookInfo.Title}
              </p>
              <p>
                <span className="font-weight-bold">author:</span>{" "}
                {bookInfo && bookInfo.Author}
              </p>
              <p>
                <span className="font-weight-bold">genre:</span>{" "}
                {bookInfo && bookInfo.Topics && bookInfo.Topics[0]}
              </p>
              <p>
                <span className="font-weight-bold">pagecount:</span>{" "}
                {bookInfo && bookInfo.NumberOfPages}
              </p>
              <br />
              <p>does this info look correct?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary mr-auto"
                // data-dismiss="modal"
                // ADD PARAMETERS FOR BOOK INFO
                onClick={() => acceptBookInfo()}
              >
                yes, looks good!
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={toManualEntry}
              >
                no, i need to change something
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-container")
    // since this is a portal, it will actually render in this location
  );
}
