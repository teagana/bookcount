import React from "react";

export default function ManualAddBook() {
  return (
    <div className="container mt-5">
      <h3 className="text-center">enter your book's info:</h3>
      <div className="mt-3">
        <form id="manualentry" className="mx-auto">
          <div className="form-group">
            <label htmlFor="title">title</label>
            <input type="text" className="form-control" id="title" />
            {/* error if nothing put in this input */}
            <small id="error" className="text-danger"></small>
          </div>
          <div className="form-group">
            <label htmlFor="author">author</label>
            <input type="text" className="form-control" id="author" />
            {/* error if nothing put in this input */}
            <small id="error" className="text-danger"></small>
          </div>
          <div className="form-group">
            <label htmlFor="genre">genre</label>
            <input type="text" className="form-control" id="genre" />
          </div>
          <div className="form-group">
            <label htmlFor="pagecount">pagecount</label>
            <input type="text" className="form-control" id="pagecount" />
            {/* error if nothing put in this input or if it's not a positive integer */}
            <small id="error" className="text-danger"></small>
          </div>
          <div className="text-center mt-5">
            <button
              id="manual-submit"
              type="submit"
              className="btn btn-primary"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
