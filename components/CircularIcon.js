import { FaCircle } from 'react-icons/fa';
import styles from '../styles/CirculasIcon.module.css'; // Ajuste o caminho conforme necessário

const CircularIcon = ({ handleClick }) => (
    <div className={styles.wrapper}>
      <div className={styles.outerCircle}></div>
      <div className={styles.middleCircle}></div>
      <div className={styles.innerCircle} onClick={() => handleClick('iframe1')}>
        <span className={styles.iconText}>INICIAR</span>
      </div>
    </div>
  );

export default CircularIcon;
