import styles from '../styles/HorizontalBar.module.css';

const HorizontalBar = ({ percentage }) => {
  return (
    <div className={styles.barContainer}>
      <div className={styles.bar} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default HorizontalBar;
