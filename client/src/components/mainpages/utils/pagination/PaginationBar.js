import React from 'react';
import './pagination.css';
import {
  PaginationContainer,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
} from './PaginationElements';
import { useDispatch } from 'react-redux';
import { productActions } from '../../../../redux/actions';

export const PaginationBar = ({ pageNum, setPageNum, totalPage }) => {
  const dispatch = useDispatch();

  const handleClickOnPrev = (e) => {
    e.preventDefault();
    let nePage = pageNum;
    if (pageNum > 1) {
      nePage = pageNum - 1;
      setPageNum(nePage);
    }
    dispatch(productActions.getAllProducts(nePage));
  };

  const handleClickOnNext = (e) => {
    e.preventDefault();
    let newPage = pageNum;
    if (pageNum < totalPage) {
      newPage = pageNum + 1;
      setPageNum(newPage);
    }
    dispatch(productActions.getAllProducts(newPage));
  };

  const handleClickOnPage = (e, page) => {
    e.preventDefault();
    let newPage = page;
    setPageNum(newPage);
    dispatch(productActions.getAllProducts(newPage));
  };

  return (
    <PaginationContainer>
      <PaginationPrev
        pageNum={pageNum}
        disabled={pageNum === 1}
        onClick={handleClickOnPrev}
      >
        <i className="fas fa-angle-left"></i>
      </PaginationPrev>
      <PaginationItem
        className={pageNum === 1 ? 'isActive' : ''}
        onClick={(e) => handleClickOnPage(e, 1)}
      >
        {1}
      </PaginationItem>

      {pageNum === 1 && pageNum < totalPage && (
        <PaginationItem onClick={(e) => handleClickOnPage(e, pageNum + 1)}>
          {2}{' '}
        </PaginationItem>
      )}

      {pageNum > 1 && pageNum < totalPage && (
        <PaginationItem
          className="isActive"
          onClick={(e) => handleClickOnPage(e, pageNum + 1)}
        >
          {pageNum}{' '}
        </PaginationItem>
      )}

      {pageNum > 1 && pageNum + 1 < totalPage && (
        <PaginationItem onClick={(e) => handleClickOnPage(e, pageNum + 1)}>
          {pageNum + 1}{' '}
        </PaginationItem>
      )}

      <PaginationItem> ... </PaginationItem>

      {totalPage > 1 && (
        <PaginationItem
          className={pageNum === totalPage ? 'isActive' : ''}
          onClick={(e) => handleClickOnPage(e, totalPage)}
        >
          {totalPage}
        </PaginationItem>
      )}

      <PaginationNext
        pageNum={pageNum}
        totalPage={totalPage}
        disabled={pageNum === totalPage}
        onClick={handleClickOnNext}
      >
        <i className="fas fa-angle-right"></i>
      </PaginationNext>
    </PaginationContainer>
  );
};
