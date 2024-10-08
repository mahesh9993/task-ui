import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <span
            className="page-link cursor-pointer"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </span>
        </li>
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <span
              className="page-link cursor-pointer"
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          </li>
        ))}
        <li
          className={
            currentPage === pageCount ? "page-item disabled" : "page-item"
          }
        >
          <span
            className="page-link cursor-pointer"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
