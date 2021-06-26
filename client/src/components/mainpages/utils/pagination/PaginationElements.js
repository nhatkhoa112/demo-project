import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PaginationItem = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid #555;
  margin: 0 10px;
  font-weight: 600;
  &:hover {
    border: 2px #5c986a solid;
    color: #5c986a;
    font-weight: 700;
  }
`;

export const PaginationFirst = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 0 10px;
  font-weight: 600;

  &:hover {
    border: 2px #5c986a solid;
    color: #5c986a;
    font-weight: 700;
  }
`;

export const PaginationLast = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 0 10px;
  font-weight: 600;

  &:hover {
    border: 2px #5c986a solid;
    color: #5c986a;
    font-weight: 700;
  }
`;

export const PaginationPrev = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 0 10px;
  font-weight: 600;
  &:hover {
    border: ${({ pageNum }) =>
      pageNum !== 1 ? '2px #5c986a solid' : '1px solid #ccc'};
    color: ${({ pageNum }) => (pageNum !== 1 ? '#5c986a' : '#ccc')};
    font-weight: 700;
  }
`;

export const PaginationNext = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 0 10px;
  font-weight: 600;
  &:hover {
    border: ${({ pageNum, totalPage }) =>
      pageNum !== totalPage ? '2px #5c986a solid' : '1px solid #ccc'};
    color: ${({ pageNum, totalPage }) =>
      pageNum !== totalPage ? '#5c986a' : '#ccc'};
    font-weight: 700;
  }
`;
