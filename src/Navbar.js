import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link className="navbar-brand pl-2" to="/">
        bookcount
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav">
          <li id="add-book-link" className="nav-item">
            <Link className="nav-link" to="/add_book">
              +
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/set_goals">
              set goals
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/booklist">
              see list
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
