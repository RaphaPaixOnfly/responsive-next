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
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Desempenho',
          data: data,
          backgroundColor: ['#4caf50', '#ddd'],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    };
  
    if (type === 'doughnut') {
      return (
        <div className={styles.chartContainer}>
          <h2>Geral</h2>
          <Doughnut data={chartData} options={options} />
          <div className={styles.percentageLabel}>{data[0]}%</div>
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
  