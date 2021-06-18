import React from 'react';
import {
  PaginationContainer,
  PaginationFirst,
  PaginationLast,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
} from './PaginationElements';
import { useDispatch } from 'react-redux';

export const PaginationBar = ({ pageNum, setPageNum, totalPage }) => {
  const handleClickOnFirst = (e) => {
    e.preventDefault();
    setPageNum(1);
  };
  const handleClickOnPrev = (e) => {
    e.preventDefault();
    if (pageNum > 1) setPageNum((num) => num - 1);
  };

  const handleClickOnLast = (e) => {
    e.preventDefault();
    setPageNum(totalPage);
  };
  const handleClickOnNext = (e) => {
    e.preventDefault();
    if (pageNum < totalPage) setPageNum((num) => num + 1);
  };

  const handleClickOnPage = (e, page) => {
    e.preventDefault();
    setPageNum(page);
  };

  return (
    <PaginationContainer>
      <PaginationFirst
        disabled={pageNum === 1}
        onClick={handleClickOnFirst}
      ></PaginationFirst>
      <PaginationPrev
        disabled={pageNum === 1}
        onClick={handleClickOnPrev}
      ></PaginationPrev>
      <PaginationItem
        active={pageNum === 1}
        onClick={(e) => handleClickOnPage(e, 1)}
      >
        {1}
      </PaginationItem>

      {pageNum > 1 && pageNum < totalPage && (
        <PaginationItem active>{pageNum}</PaginationItem>
      )}

      {totalPage > 1 && (
        <PaginationItem
          active={pageNum === totalPage}
          onClick={(e) => handleClickOnPage(e, totalPage)}
        >
          {totalPage}
        </PaginationItem>
      )}
      <PaginationNext
        disabled={pageNum === totalPage}
        onClick={handleClickOnNext}
      ></PaginationNext>
      <PaginationLast
        disabled={pageNum === totalPage}
        onClick={handleClickOnLast}
      ></PaginationLast>
    </PaginationContainer>
  );
};
