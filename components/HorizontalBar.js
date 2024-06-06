import styles from '../styles/Dashboard.module.css';

const HorizontalBar = ({ percentage, nota, topico }) => {
  const getBackgroundColor = (value) => {
    if (value == 100) return '#0000ff'; // Blue
    if (value >= 70) return '#4caf50'; // Green
    if (value >= 40 && value < 70) return '#ffeb3b'; // Yellow
    if (value < 40) return '#f44336'; // Red
    return '#2196f3'; // Light Blue for 100%
  };

  const backgroundColor = getBackgroundColor(percentage);
  const lighterBackgroundColor = `${backgroundColor}33`; // Making the color lighter (33 is the alpha value)

  return (
    <div className={styles['dashboard-bar-container']}>
      <div className={styles['dashboard-bar-header']}>
        <div className={styles['dashboard-bar-topico']}>{topico}</div>
        <div
          className={styles['dashboard-percentage-label']}
          style={{
            color: backgroundColor,
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '2px 5px',
            fontSize: '12px',
            border: `1px solid ${backgroundColor}`,
          }}
        >
          {nota}
        </div>
      </div>
      <div
        className={styles['dashboard-bar-background']}
        style={{
          backgroundColor: lighterBackgroundColor,
        }}
      >
        <div
          className={styles['dashboard-bar']}
          style={{
            width: `${percentage}%`,
            backgroundColor: backgroundColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default HorizontalBar;
