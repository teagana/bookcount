import { React, useState, useEffect } from "react";
import { getAllGoals, saveGoals } from "./api";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

export default function SetGoals() {
  // use states for all four of the goals
  const [booksThisYear, setBooksThisYear] = useState("");
  const [booksThisMonth, setBooksThisMonth] = useState("");
  const [pagesThisYear, setPagesThisYear] = useState("");
  const [pagesThisMonth, setPagesThisMonth] = useState("");

  // use states for all four possible errors
  const [booksThisYearError, setBooksThisYearError] = useState("");
  const [booksThisMonthError, setBooksThisMonthError] = useState("");
  const [pagesThisYearError, setPagesThisYearError] = useState("");
  const [pagesThisMonthError, setPagesThisMonthError] = useState("");

  document.title = "set goals | bookcount";

  // notification for successful goal update
  const successfulUpdateNotif = () => toast("successfully updated goals!");

  useEffect(() => {
    getAllGoals().then((response) => {
      // set states for all the goal inputs
      setBooksThisYear(response.books_this_year);
      setBooksThisMonth(response.books_this_month);
      setPagesThisYear(response.pages_this_year);
      setPagesThisMonth(response.pages_this_month);
    });
  }, []);

  // handle submission of saving goal page
  function handleSubmit(event) {
    event.preventDefault();

    // validation to make sure each one is a positive integer
    // find if any of the inputs have something that isn't a number in them
    let booksThisYearFlag = !isNaN(booksThisYear) ? true : false;
    let booksThisMonthFlag = !isNaN(booksThisMonth) ? true : false;
    let pagesThisYearFlag = !isNaN(pagesThisYear) ? true : false;
    let pagesThisMonthFlag = !isNaN(pagesThisMonth) ? true : false;

    // save goals function from api
    // if all of the inputs are numbers
    if (
      booksThisYearFlag &&
      booksThisMonthFlag &&
      pagesThisYearFlag &&
      pagesThisMonthFlag
    ) {
      let goals = {
        books_this_year: Number(booksThisYear),
        books_this_month: Number(booksThisMonth),
        pages_this_year: Number(pagesThisYear),
        pages_this_month: Number(pagesThisMonth),
      };

      // reset all errors
      setBooksThisYearError("");
      setBooksThisMonthError("");
      setPagesThisYearError("");
      setPagesThisMonthError("");

      // make api call to save goal inputs
      saveGoals(goals).then((response) => {
        console.log(response);
        successfulUpdateNotif(); // notify user of successful goal update
      });
    }

    // set errors if applicable
    else {
      setBooksThisYearError(booksThisYearFlag ? "" : "goal must be a number");
      setBooksThisMonthError(booksThisMonthFlag ? "" : "goal must be a number");
      setPagesThisYearError(pagesThisYearFlag ? "" : "goal must be a number");
      setPagesThisMonthError(pagesThisMonthFlag ? "" : "goal must be a number");
    }
  }

  function handleBooksThisYearChange(event) {
    setBooksThisYear(event.target.value);
  }

  function handleBooksThisMonthChange(event) {
    setBooksThisMonth(event.target.value);
  }

  function handlePagesThisYearChange(event) {
    setPagesThisYear(event.target.value);
  }

  function handlePagesThisMonthChange(event) {
    setPagesThisMonth(event.target.value);
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <ToastContainer />
        <h3 className="text-left">my goals</h3>
        <div className="mt-5">
          <form id="goals" className="mx-auto" onSubmit={handleSubmit}>
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
                    value={booksThisYear}
                    onChange={handleBooksThisYearChange}
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger">
                    {booksThisYearError}
                  </small>
                </div>
                <div className="form-group form-inline">
                  <label htmlFor="books-this-month" className="goal-label">
                    this month:
                  </label>
                  <input
                    type="text"
                    className="form-control goal-input"
                    id="books-this-month"
                    value={booksThisMonth}
                    onChange={handleBooksThisMonthChange}
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger">
                    {booksThisMonthError}
                  </small>
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
                    value={pagesThisYear}
                    onChange={handlePagesThisYearChange}
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger">
                    {pagesThisYearError}
                  </small>
                </div>
                <div className="form-group form-inline">
                  <label htmlFor="pages-this-month" className="goal-label">
                    this month:
                  </label>
                  <input
                    type="text"
                    className="form-control goal-input"
                    id="pages-this-month"
                    value={pagesThisMonth}
                    onChange={handlePagesThisMonthChange}
                  />
                  {/* error if anything other than 0/positive integer */}
                  <small id="error" className="text-danger">
                    {pagesThisMonthError}
                  </small>
                </div>
              </div>
            </div>

            <div className="mt-5 text-right">
              <button
                id="save-goals"
                type="submit"
                className="btn btn-primary"
                onSubmit={handleSubmit}
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
