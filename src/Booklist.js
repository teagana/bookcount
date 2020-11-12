import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Booklist() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-left">books i've read:</h3>
        <div id="list">
          {/* dummy example (there will be many of these) */}
          <div className="list-item mt-2">
            <span>title</span>
            {" | "}
            <span>author</span>
            {" | "}
            <span>genre</span>
            {" | "}
            <span>pagecount</span>
            {" / "}
            <Link to="" className="text-danger">
              delete
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
