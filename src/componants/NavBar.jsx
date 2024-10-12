import React from "react";

const NavBar = ({ searchTerm, onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Tasks</a>
        <form class="d-flex" onSubmit={(e) => e.preventDefault()}>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          ></input>
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
