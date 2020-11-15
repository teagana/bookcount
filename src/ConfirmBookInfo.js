import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import { createBook } from "./api";

export default function ConfirmBookInfo({ onClose, bookInfo }) {
  let history = useHistory();

  function toManualEntry() {
    onClose();
    history.push("/add_book_manual"); // go to manual add page
  }

  // ADD PARAMETERS FOR BOOK INFO
  function acceptBookInfo() {
    // date shenanigans
    const today = new Date(Date.now());
    console.log(today.getMonth(), today.getFullYear());

    createBook({
      title: bookInfo.Title,
      genre: bookInfo.Author,
      author: bookInfo.Topics[0],
      timestamp: today,
      pagecount: Number(bookInfo.NumberOfPages),
    }).then((response) => {
      onClose();
      history.push("/"); // go gack to home page
    });
  }

  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title">Delete Issue</h5> */}
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
              <p>title: {bookInfo && bookInfo.Title}</p>
              <p>author: {bookInfo && bookInfo.Author}</p>
              <p>genre: {bookInfo && bookInfo.Topics[0]}</p>
              <p>pagecount: {bookInfo && bookInfo.NumberOfPages}</p>
              <br />
              <p>does this info look correct?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                // data-dismiss="modal"
                // ADD PARAMETERS FOR BOOK INFO
                onClick={() => acceptBookInfo()}
              >
                yes
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={toManualEntry}
              >
                no
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
