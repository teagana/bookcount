import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { createBook } from "./api";
import Navbar from "./Navbar";
import { Formik } from "formik";

export default function ManualAddBook() {
  const location = useLocation();
  let history = useHistory();

  document.title = "add book manually | bookcount";

  let title = "";
  let author = "";
  let genre = "";
  let pagecount = "";

  // if there is state passed in from the modal, capture it
  if (typeof location.state !== "undefined") {
    // console.log(typeof location.state);
    title = location.state.title;
    author = location.state.author;
    genre = location.state.genre;
    pagecount = location.state.pagecount;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-center">enter your book's info:</h3>
        <div className="mt-3">
          <Formik
            initialValues={{
              title: title,
              author: author,
              genre: genre,
              pagecount: pagecount,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "this field is required";
              }
              if (!values.author) {
                errors.author = "this field is required";
              }
              if (!values.genre) {
                errors.genre = "this field is required";
              }
              if (!values.pagecount) {
                errors.pagecount = "this field is required";
              } else if (isNaN(values.pagecount)) {
                errors.pagecount = "pagecount must be a number";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);

              // create timestamp
              const today = new Date(Date.now());

              // createBook API call!!
              createBook({
                title: JSON.stringify(values.title),
                author: JSON.stringify(values.author),
                genre: JSON.stringify(values.genre),
                pagecount: values.pagecount,
                timestamp: today,
              }).then((response) => {
                // tell the home page the user just successfully added a book
                history.push("/", {
                  successNotif: true,
                }); // go back to home page
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                id="manualentry"
                className="mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="title">title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    className="form-control"
                  />

                  <small className="text-danger">
                    {errors.title && touched.title && errors.title}
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="author">author</label>
                  <input
                    type="text"
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                    className="form-control"
                  />
                  <small className="text-danger">
                    {errors.author && touched.author && errors.author}
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="genre">genre</label>
                  <input
                    type="text"
                    name="genre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.genre}
                    className="form-control"
                  />
                  <small className="text-danger">
                    {errors.genre && touched.genre && errors.genre}
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="pagecount">pagecount</label>
                  <input
                    type="text"
                    name="pagecount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pagecount}
                    className="form-control"
                  />
                  <small className="text-danger">
                    {errors.pagecount && touched.pagecount && errors.pagecount}
                  </small>
                </div>

                <div className="text-center mt-2">
                  <button
                    id="manual-submit"
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
