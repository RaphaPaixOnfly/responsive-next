import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
  } from 'chart.js';
  import { Doughnut, Bar } from 'react-chartjs-2';
  
  // Registrando elementos necessários
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );
  
  const ChartComponent = ({ type, data, labels }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Desempenho',
          data: data,
          backgroundColor: ['#4caf50', '#ddd'],
          borderWidth: 1,
          cutout: '50%',
          rotation: 180,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
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
  