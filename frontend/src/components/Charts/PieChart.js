import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map(() => `hsl(${Math.random() * 360}, 50%, 70%)`),
      },
    ],
  };
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default PieChart;
