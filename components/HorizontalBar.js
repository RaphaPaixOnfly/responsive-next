import styles from '../styles/Dashboard.module.css';

const HorizontalBar = ({ percentage }) => {
  const getBackgroundColor = (value) => {
    if (value >= 70) return '#4caf50'; // Green
    if (value >= 40 && value < 70) return '#ffeb3b'; // Yellow
    if (value < 40) return '#f44336'; // Red
    return '#2196f3'; // Light Blue for 100%
  };

  return (
    <div className={styles['dashboard-bar-container']}>
      <div
        className={styles['dashboard-bar']}
        style={{
          width: `${percentage}%`,
          backgroundColor: getBackgroundColor(percentage),
        }}
      ></div>
      <div
        className={styles['dashboard-percentage-label']}
        style={{ color: getBackgroundColor(percentage) }}
      >
        {percentage}
      </div>
    </div>
  );
};

export default HorizontalBar;
