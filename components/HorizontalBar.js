import styles from '../styles/Dashboard.module.css';

const HorizontalBar = ({ percentage }) => {
  return (
    <div className={styles['bar-container']}>
      <div className={styles.bar} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default HorizontalBar;
