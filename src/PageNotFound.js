import React from "react";
import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation(); // gives you the path name

  return (
    <div>
      <h3>Page not found.</h3>
      <p>
        The requested URL <code>{location.pathname}</code> does not exist on
        this site.
      </p>
    </div>
  );
}
