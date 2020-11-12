import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand pl-2" href="#">
        bookcount
      </a>
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
            <a className="nav-link" href="#">
              +
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              set goals
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              see list
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
