import styles from '../styles/Dashboard.module.css';

const getBackgroundColor = (value) => {
  if (value >= 70) return '#4caf50'; // Green
  if (value >= 40 && value < 70) return '#ffeb3b'; // Yellow
  if (value < 40) return '#f44336'; // Red
  return '#2196f3'; // Light Blue for 100%
};

const HorizontalBar = ({ percentage }) => {
  const backgroundColor = getBackgroundColor(percentage);
  return (
    <div className={styles['bar-container']}>
      <div
        className={styles['bar']}
        style={{ width: `${percentage}%`, backgroundColor }}
      />
      <div className={styles['percentage-label']} style={{ color: backgroundColor }}>
        {percentage}%
      </div>
    </div>
  );
};

export default HorizontalBar;
