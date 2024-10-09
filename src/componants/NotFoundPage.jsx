import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-column gap-2">
      NotFound
      <Link to={"/"}>Go Back To Home</Link>
    </div>
  );
}

export default NotFoundPage;
