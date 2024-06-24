import React from 'react';
import Pageloader from './Pageloader';
import Modal from 'react-modal'

interface LoaderModalProps {
  isOpen: boolean;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen = {isOpen} className="modal">
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
        <Pageloader size="100" speed="1.75" color="purple" />
        </div>
    </Modal>
  );
};

export default LoaderModal;
