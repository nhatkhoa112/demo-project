import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { DropZone } from '../dropZone/DropZone';
import {
  Background,
  ModalWrapper,
  ModalDropZone,
  CloseModalButton,
  ModalButtonUpload,
  Button,
} from './ModalUploadElements';

export const ModalUpload = ({ modalOpen, setModalOpen }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen ? (
        <Background ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper modalOpen={modalOpen}>
              <ModalDropZone>
                <DropZone />
              </ModalDropZone>

              <ModalButtonUpload>
                <Button>Upload</Button>
              </ModalButtonUpload>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setModalOpen((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
