import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Amount',
        data: data.map((item) => item.amount),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} options={{ maintainAspectRatio: false }} />;
};

export default LineChart;
