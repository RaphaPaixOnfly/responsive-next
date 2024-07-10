import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const getBackgroundColor = (value) => {
  if (value === 100) return 'rgba(0, 134, 209, 1)'; // blue
  if (value >= 70) return 'rgba(76, 175, 80, 0.2)'; // Green
  if (value >= 40 && value < 70) return '#fceccc'; // Yellow
  if (value < 40) return 'rgba(244, 67, 54, 0.2)'; // Red
  return 'rgba(33, 150, 243, 0.2)'; // Light Blue for 100%
};

const getBorderColor = (value) => {
  if (value === 100) return 'rgba(0, 134, 209, 1)'; // blue
  if (value >= 70) return 'rgba(76, 175, 80, 1)'; // Green
  if (value >= 40 && value < 70) return '#ffaa00'; // Yellow
  if (value < 40) return 'rgba(244, 67, 54, 1)'; // Red
  return 'rgba(33, 150, 243, 1)'; // Light Blue for 100%
};

const ChartComponent = ({ type, data, labels, geral }) => {
  const backgroundColor = getBackgroundColor(geral);
  const borderColor = getBorderColor(geral);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Desempenho',
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        pointBackgroundColor: borderColor,
        pointBorderColor: borderColor,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true, // Preencher a área interna entre os pontos
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
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        pointLabels: {
          display: false, // Esconder os nomes dos tópicos
        },
        ticks: {
          showLabelBackdrop: false,
          callback: function (value) {
            return value;
          },
        },
      },
    },
  };

  if (type === 'radar') {
    return (
      <div className="chart-container">
        <Radar data={chartData} options={options} />
      </div>
    );
  } else {
    return null;
  }
};

export default ChartComponent;
