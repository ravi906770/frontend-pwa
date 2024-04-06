import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import axios from 'axios';

type Category = {
  category : string,
  totalAmount : number
}

interface Props{
  categoryData:{ category: string; totalAmount: number }[],
  fetchCategory:()=>void
}


const PieChart :React.FC<Props> = ({categoryData,fetchCategory}) => {
    const chartRef = useRef<Chart<"pie", number[], unknown> | null>(null);

    
    const colors = [
      '#FF6384', // Red
      '#36A2EB', // Blue
      '#FFCE56', // Yellow
      '#8A2BE2', // Purple
      '#20B2AA', // Light Sea Green
      '#FF7F50', // Coral
      '#32CD32', // Lime Green
      '#FFD700'  // Gold
  ];



    useEffect(()=>{
      fetchCategory();
     },[])


  useEffect(() => {
    const ctx = document.getElementById('Chart') as HTMLCanvasElement;

    if (ctx && !chartRef.current ) {
      const config: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels:categoryData.map(item=>item.category),
          datasets: [{
            label: 'Expense',
            data: categoryData.map(item=>item.totalAmount),
            backgroundColor: [
              '#FF6384', // Red
              '#36A2EB', // Blue
              '#FFCE56', // Yellow
              '#8A2BE2', // Purple
              '#20B2AA', // Light Sea Green
              '#FF7F50', // Coral
              '#32CD32', // Lime Green
              '#FFD700',  // Gold
              '#A52A2A'  // Gold '#FFD700'

            ]
          }]
        },
        options: {
          responsive : true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      chartRef.current = new Chart(ctx, config);
    } else if (chartRef.current ) {
      chartRef.current.data.datasets[0].data = categoryData.map(item=>item.totalAmount);
      chartRef.current.data.labels = categoryData.map(item => item.category)
      chartRef.current.update();
    }
  }, [categoryData]);

  return (
    <div className="lg:h-96 lg:w-96 sm:h-[330px] sm:w-[280px] md:h-[320px]
">
      <canvas id="Chart"></canvas>
    </div>
  );
};

export default PieChart;
