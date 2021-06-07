import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalWrapper = styled.div`
  width: 60vw;
  height: 60vh;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 1);
  color: black;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1001;
  border-radius: 10px;
`;

export const ModalDropZone = styled.div`
  margin: 40px;
  margin-bottom: 0;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8;
  overflow: hidden;
  overflow-y: auto;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;
export const ModalButtonUpload = styled.div`
  flex: 0.4;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  font-size: 1.1rem;
  font-weight: 600;
  position: relative;
  padding: 10px 20px;
  background: none;
  border: 1px solid #000;
  min-width: 200px;
  cursor: pointer;
  transition: color 0.3s linear;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      #c700ab 0%,
      #c700ed 25%,
      #a100d5 50%,
      #a100ef 75%,
      #9600ff 100%
    );
    z-index: -1;
    transition: transform 0.5s;
    transform-origin: 0 0;
    transition-timing-function: cubic-bezier(0.5, 1.6, 0.4, 0.7);
    transform: scaleX(0);
  }
  &:hover {
    color: #fff;

    &::before {
      transform: scaleX(1);
    }
  }
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
