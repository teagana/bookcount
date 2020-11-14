import React from "react";
import Navbar from "./Navbar";

export default function SetGoals() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-left">my goals</h3>
        <div className="mt-5">
          <form id="goals" className="mx-auto">
            <div className="row">
              <div id="books" className="col-6">
                <h4 className="mb-4">books</h4>
                <div className="form-group form-inline">
                  <label htmlFor="books-this-year" className="goal-label">
                    this year:
                  </label>
                  <input
                    type="text"
                    className="form-control goal-input"
                    id="books-this-year"
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger"></small>
                </div>
                <div className="form-group form-inline">
                  <label htmlFor="books-this-month" className="goal-label">
                    this month:
                  </label>
                  <input
                    type="text"
                    className="form-control goal-input"
                    id="books-this-month"
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger"></small>
                </div>
              </div>

              <div id="pages" className="col-6">
                <h4 className="mb-4">pages</h4>
                <div className="form-group form-inline">
                  <label htmlFor="pages-this-year" className="goal-label">
                    this year:
                  </label>
                  <input
                    type="text"
                    className="form-control goal-input"
                    id="pages-this-year"
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger"></small>
                </div>
                <div className="form-group form-inline">
                  <label htmlFor="pages-this-month" className="goal-label">
                    this month:
                  </label>
                  <input
                    type="text"
                    className="form-control goal-input"
                    id="pages-this-month"
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger"></small>
                </div>
              </div>
            </div>

            <div className="mt-5 text-right">
              <button id="save-goals" type="submit" className="btn btn-primary">
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
