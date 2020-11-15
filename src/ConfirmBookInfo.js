import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import { createBook } from "./api";

export default function ConfirmBookInfo({ onClose }) {
  let history = useHistory();

  function toManualEntry() {
    onClose();
    history.push("/add_book_manual");
  }

  // ADD PARAMETERS FOR BOOK INFO
  function acceptBookInfo() {
    // date shenanigans
    const today = new Date(Date.now());
    console.log(today.getMonth(), today.getFullYear());

    // createBook({
    //   title: "",
    //   genre: "",
    //   author: "",
    //   timestamp: "",
    //   pagecount: 0,
    // }).then((response) => {
    //   onClose();
    //   return <Redirect to={"/"} />;
    // });
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
              <p>[title]</p>
              <p>[author]</p>
              <p>[genre]</p>
              <p>[pagecount]</p>
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
