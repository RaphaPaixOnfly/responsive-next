import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    BarElement,
  } from 'chart.js';
  import { Doughnut, Bar } from 'react-chartjs-2';
  import styles from '../styles/Dashboard.module.css';
  
  ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);
  
  const ChartComponent = ({ type, data, labels }) => {
    const getColor = (value) => {
      if (value === 100) return '#ADD8E6'; // Azul claro
      if (value > 69) return '#4caf50'; // Verde
      if (value >= 40 && value <= 69) return '#FFD700'; // Amarelo
      return '#FF0000'; // Vermelho
    };
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Desempenho',
          data: data,
          backgroundColor: [getColor(data[0]), '#ddd'],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      rotation: -90,
      circumference: 180,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    if (type === 'doughnut') {
      return (
        <div className={styles.chartContainer}>
          <h2 className={styles.title}>Geral</h2>
          <Doughnut data={chartData} options={options} />
          <div className={styles.percentageLabel}>{data[0]}</div>
        </div>
      );
    } else if (type === 'bar') {
      return (
        <div className={styles.chartContainer}>
          <Bar data={chartData} options={options} />
        </div>
      );
    } else {
      return null;
    }
  };
  
  export default ChartComponent;
  