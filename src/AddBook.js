import React, { useState } from "react";
import ConfirmBookInfo from "./ConfirmBookInfo";
import Navbar from "./Navbar";

export default function AddBook() {
  const [isModalShown, setIsModalShown] = useState(false);
  const [title, setTitle] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  // when user hits enter, show modal with bookmooch info
  function handleSubmit(event) {
    event.preventDefault();

    // BOOK MOOCH API CALL

    setIsModalShown(true);
  }

  // close the modal
  function hideModal() {
    setIsModalShown(false);
  }

  return (
    <>
      <div id="content">
        <Navbar />
        {/* only show modal upon submit */}
        {isModalShown && <ConfirmBookInfo onClose={hideModal} />}

        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <h3 className="text-center">enter a title:</h3>
              <div className="pt-3">
                <form
                  id="add-by-title"
                  className="mx-auto"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="title-only"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                  <button type="submit" style={{ display: "none" }} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
