import React from "react";
import Navbar from "./Navbar";

export default function AddBook() {
  return (
    <>
      <div id="content">
        <Navbar />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <h3 className="text-center">enter a title:</h3>
              <div className="pt-3">
                <form id="add-by-title" className="mx-auto">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="title-only"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
