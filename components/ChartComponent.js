import { Doughnut } from 'react-chartjs-2';

const ChartComponent = ({ type, data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Desempenho',
        data: data,
        backgroundColor: ['#4caf50', '#ddd'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
