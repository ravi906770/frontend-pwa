import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import axios from 'axios';

interface Props{
  transactionData:{ month: string; payment: number }[],
  fetch:()=>void
}
  
const LineChart: React.FC<Props> = ({transactionData,fetch}) => {
     const chartRef = useRef<Chart<"line", unknown> | null>(null);


    //  const [transactionData , setTransactionData] = useState<{ month: string; payment: number }[]>([]);

     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
     useEffect(()=>{
   
      fetch();
     },[])
    //  useEffect(()=>{
   
    //   fetch();
    //   console.log("$#$#$#%$#%$#%");
      
    //   console.log(transactionData);
      
    //  },[])


  useEffect(() => {
    const ctx = document.getElementById('LineChart') as HTMLCanvasElement;

    if (ctx && !chartRef.current) {
      const config: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'Expenses',
            data:  transactionData.map(item => item.payment),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#8A2BE2',
              '#20B2AA',
              '#FF7F50',
              '#6495ED',
              '#ADFF2F',
              '#D2691E',
              '#00BFFF',
              '#FFD700',
              '#8B008B'
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      chartRef.current = new Chart(ctx, config);
    } else if (chartRef.current) {
      chartRef.current.data.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      chartRef.current.data.datasets[0].data = transactionData?.map(item => item.payment);
      chartRef.current.update();
    }
  }, [transactionData]);

  return (
    <div className="h-full w-full ">
      <canvas id="LineChart"></canvas>
    </div>
  );
};

export default LineChart;
