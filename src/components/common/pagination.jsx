import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const pagesCount = calcPagesCount(props);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">{createPage(pages, props)}</ul>
    </nav>
  );
};

export default Pagination;

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const createPage = (pages, props) => {
  const { onPageChange, currentPage } = props;
  return pages.map((page) => (
    <li
      key={page}
      className={page === currentPage ? "page-item active" : "page-item"}
    >
      <a className="page-link" href="#" onClick={() => onPageChange(page)}>
        {page}
      </a>
    </li>
  ));
};

const calcPagesCount = (props) => {
  const { itemsCount, pageSize } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  return pagesCount;
};
