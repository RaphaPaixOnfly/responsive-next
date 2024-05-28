import styles from '../styles/Dashboard.module.css';

const HorizontalBar = ({ percentage }) => {
  const getColor = (value) => {
    if (value === 100) return '#ADD8E6'; // Azul claro
    if (value > 69) return '#4caf50'; // Verde
    if (value >= 40 && value <= 69) return '#FFD700'; // Amarelo
    return '#FF0000'; // Vermelho
  };

  return (
    <div className={styles.barContainer}>
      <div className={styles.bar} style={{ width: `${percentage}%`, backgroundColor: getColor(percentage) }}></div>
    </div>
  );
};

export default HorizontalBar;
