import { useEffect } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({closeModal, children}) => {
  useEffect(() => {

    const handlerCloseESC = e => {
      e.key === 'Escape' && closeModal();
    };

    document.addEventListener('keydown', handlerCloseESC);

    return () => {
      document.removeEventListener('keydown', handlerCloseESC);
    }
  }, [closeModal])


  const handleClickBackdrop = ({ target, currentTarget }) => {
    target === currentTarget && closeModal();
  };
  return createPortal(
    <div className={styles.overlay} onClick={handleClickBackdrop}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

