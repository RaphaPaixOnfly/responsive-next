import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/InputCompartilhar.module.css';
import { handleShare } from './SharePopup2'; 

const InputCompartilhar = ({ token }) => {
  const [inputValue] = useState(`${window.location.origin}/?token=${token}`);
  
  const copyToClipboard = () => {
    const input = document.getElementById('myInput');
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  };

  return (
    <div className={styles.inputCompartilharContainer}>
      <input type="text" id="myInput" value={inputValue} readOnly />
      <button onClick={copyToClipboard}>
        <FontAwesomeIcon icon={faCopy} className={styles.copyIcon} />
      </button>
      <button onClick={() => handleShare(token, () => {})} className={styles.shareButton}>
        <FontAwesomeIcon icon={faShareAlt} className={styles.shareIcon} />
      </button>
    </div>
  );
};

export default InputCompartilhar;
