import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Modal = ({ isOpen, onClose, iframeSrc }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <iframe src={iframeSrc} className={styles.iframe} />
      </div>
    </div>
  );
};

export default Modal;
