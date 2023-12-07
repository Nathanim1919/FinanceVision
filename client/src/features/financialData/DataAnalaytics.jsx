import {
    Chart as ChartJS
} from 'chart.js/auto'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const DataAnalytics = ({ selectedYear }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Incomes',
        data: [],
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Expenses',
        data: [],
        fill: true,
        borderColor: 'rgba(255,99,132,1)',
      },
    ],
  });

  useEffect(() => {
    // Generate labels for the selected year
    const generateLabels = () => {
      const labels = [];
      for (let month = 0; month < 12; month++) {
        const date = new Date(selectedYear, month, 1);
        labels.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
      }
      return labels;
    };

    // Generate random data for the selected year
    const generateRandomData = () => {
      const getRandomAmount = () => Math.floor(Math.random() * 1000) + 500;
      const incomes = Array.from({ length: 12 }, () => getRandomAmount());
      const expenses = Array.from({ length: 12 }, () => getRandomAmount());
      return { incomes, expenses };
    };

    // Format your data as needed by Chart.js
    const { incomes, expenses } = generateRandomData();
    const newChartData = {
      labels: generateLabels(),
      datasets: [
        {
          label: 'Incomes',
          data: incomes,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Expenses',
          data: expenses,
          fill: false,
          borderColor: 'rgba(255,99,132,1)',
        },
      ],
    };

    setChartData(newChartData);
  }, [selectedYear]);

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <AnalyticsContainer key={JSON.stringify(chartData)}>
       <div className='header'>
            <h2>Data Analytics for {selectedYear}</h2>
            <div className='year'>
                {selectedYear}
                <div>
                    <li>2020</li>
                    <li>2021</li>
                    <li>2022</li>
                    <li>2023</li>
                </div>
            </div>
        </div>  
      <Line data={chartData} options={chartOptions} />
    </AnalyticsContainer>
  );
};

export default DataAnalytics;


const AnalyticsContainer = styled.div`
    background-color: #fff;
    box-shadow:0 7px 23px rgba(0,0,0,.074);
    margin: 1rem;
    border-radius: 10px;
    

    .header{
        display: flex;
        justify-content: center;
        gap:1rem;
        align-items: center;

        h2{
            font-size: 1.2rem;
        }

        .year{
            position: relative;

            >div{
                position: absolute;
                list-style-type: none;
                top: 0;
                left: 0;
                background-color: #fff;
                border: 1px solid #333;
                
                li{
                    width:100%;
                    cursor: pointer;
                    padding: 0.3rem;

                    &:hover{
                        color: #eee;
                    }
                }
            }
        }
    }
`