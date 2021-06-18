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

export const PaginationBar = ({ pageNum, setPageNum, totalPage = 10 }) => {
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
      <PaginationPrev disabled={pageNum === 1} onClick={handleClickOnPrev}>
        <i className="fas fa-angle-left"></i>
      </PaginationPrev>
      <PaginationItem
        active={pageNum === 1}
        onClick={(e) => handleClickOnPage(e, 1)}
      >
        {1}
      </PaginationItem>

      {pageNum === 1 && pageNum < totalPage && (
        <PaginationItem
          active
          onClick={(e) => handleClickOnPage(e, pageNum + 1)}
        >
          {2}{' '}
        </PaginationItem>
      )}

      {pageNum > 1 && pageNum < totalPage && (
        <PaginationItem
          active
          onClick={(e) => handleClickOnPage(e, pageNum + 1)}
        >
          {pageNum}{' '}
        </PaginationItem>
      )}

      {pageNum > 1 && pageNum + 1 < totalPage && (
        <PaginationItem
          active
          onClick={(e) => handleClickOnPage(e, pageNum + 1)}
        >
          {pageNum + 1}{' '}
        </PaginationItem>
      )}

      <PaginationItem> ... </PaginationItem>

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
      >
        <i className="fas fa-angle-right"></i>
      </PaginationNext>
    </PaginationContainer>
  );
};
