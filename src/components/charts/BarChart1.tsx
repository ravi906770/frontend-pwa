import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import useAxiosPrivate from '../../axios/axiosPrivate';

type Props = {
  getLimit : ()=> void,
  limitData : {income : number , daily_limit : number}[]
}

const BarChart1: React.FC<Props> = ({getLimit , limitData} : Props) => {

  const [totalAmount, setTotalAmount] = useState(0);


  const axiosPrivate = useAxiosPrivate()

 const getAllTransaction = async () => {
        try {
            const data = await axiosPrivate.get(`/getAllTransaction`)         
            setTotalAmount(data.data.totalPayment)
        } catch (error) {
            console.log(error);

        }
    }

  useEffect(()=>{
    getLimit()
    // getAllTransaction()
  },[])

  useEffect(()=>{
    getAllTransaction()
  },[])

  const chartRef = useRef<Chart<"bar", unknown> | null>(null);

  // Dummy data for income and total expense
  const income = limitData[0]?.income;
  // console.log(income);
   // Example income value
  const totalExpense = 15840;
  const Remaining = limitData[0]?.income - totalAmount; // Example total expense value

  useEffect(() => {
    const ctx = document.getElementById('Chart') as HTMLCanvasElement;

    if (ctx && !chartRef.current) {
      const config: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: ['Income', 'Total Expense' ], // Labels for income and total expense
          datasets: [
            {
              label: 'Amount',
              data: [limitData[0]?.income, totalAmount ], // Data for income and total expense
              backgroundColor: [
                'rgba(112, 238, 112 , 0.5)', // Green with opacity for income
                'rgba(255, 0, 0 , 0.5)',// Red with opacity for total expense
                'rgba(0, 0, 255 , 0.5)' 
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)', // Green for income
                'rgba(255, 99, 132, 1)', // Red for total expense
                'rgba(0, 0, 255 ,1)' 
            ],
              borderWidth: 1
            },
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      chartRef.current = new Chart(ctx, config);
    } else if (chartRef.current) {
      // Update chart data if it already exists
      chartRef.current.data.datasets[0].data = [limitData[0]?.income, totalAmount ];
      chartRef.current.update();
    }
  }, [limitData]);

  return (
    <div className="lg:h-1/2 lg:w-96 sm:h-[330px] sm:w-[280px] md:h-[320px]">
    <canvas id="Chart" style={{width:"280px"}} ></canvas>
</div>

  );
};

export default BarChart1;
    