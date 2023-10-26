
import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button type='button' onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <Modal onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}

function Modal({ onClose }:any) {
    return (
      <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center">
        <div className='bg-white p-4'>
        <div className='font-bold'>I'm a modal dialog</div>
        <button type='button' onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }