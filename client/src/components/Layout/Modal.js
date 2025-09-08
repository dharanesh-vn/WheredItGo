// client/src/components/Layout/Modal.js
import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
  opacity: ${p => (p.isOpen ? 1 : 0)}; visibility: ${p => (p.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;
const ModalContent = styled.div`
  background: #1e1e1e; padding: 2rem; border-radius: 12px; border: 1px solid #333;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5); width: 90%; max-width: 500px; position: relative;
  transform: ${p => (p.isOpen ? 'translateY(0)' : 'translateY(-20px)')}; transition: transform 0.3s ease;
`;
const CloseButton = styled.button`
  position: absolute; top: 1rem; right: 1rem; background: none; border: none;
  color: #888; cursor: pointer; font-size: 1.5rem; transition: color 0.2s ease;
  &:hover { color: white; }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
export default Modal;