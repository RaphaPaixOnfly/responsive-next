import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/InputCompartilhar.module.css'; // Importe o estilo CSS

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
      </div>
    );
  };
  
  export default InputCompartilhar;
