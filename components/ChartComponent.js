import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    BarElement,
  } from 'chart.js';
  import { Doughnut, Bar } from 'react-chartjs-2';
  
  ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);
  
  const getBackgroundColor = (value) => {
    if (value == 100) return '#0000ff'; // blue
    if (value >= 70) return '#4caf50'; // Green
    if (value >= 40 && value < 70) return '#ffeb3b'; // Yellow
    if (value < 40) return '#f44336'; // Red
    return '#2196f3'; // Light Blue for 100%
  };
  
  const ChartComponent = ({ type, data, labels }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Desempenho',
          data: data,
          backgroundColor: [getBackgroundColor(data[0]), '#ddd'],
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
    };
  
    if (type === 'doughnut') {
      return (
        <div className="chart-container">
          <Doughnut data={chartData} options={options} />
        </div>
      );
    } else if (type === 'bar') {
      return (
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      );
    } else {
      return null;
    }
  };
  
  export default ChartComponent;
  