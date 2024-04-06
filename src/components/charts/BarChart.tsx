// import React, { useEffect, useRef } from 'react';
// import Chart, { ChartConfiguration } from 'chart.js/auto';

// type Props = {
//   categoryData : {category : string , totalAmount : number}[];
//   fetchCategory : ()=>void
// };



// const BarChart : React.FC<Props> = ({categoryData,fetchCategory}) => {
//   const chartRef = useRef<Chart | null>(null);

//   useEffect(()=>{
   
//     fetchCategory();
//    },[])


//    useEffect(() => {
//     const ctx = document.getElementById('myChart') as HTMLCanvasElement;

//     if (!chartRef.current) {
//       const config: ChartConfiguration<'bar'> = {
//         type: 'bar',
//         data: {
//           labels: categoryData.map(item => item.category),
//           datasets: [{
//             label: 'Expense',
//             data: categoryData.map(item => item.totalAmount),
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(255, 159, 64, 0.2)',
//               'rgba(255, 205, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//             ],
//             borderColor: [
//               'rgb(255, 99, 132)',
//               'rgb(255, 159, 64)',
//               'rgb(255, 205, 86)',
//               'rgb(75, 192, 192)',
//               'rgb(54, 162, 235)',
//               'rgb(153, 102, 255)'
//             ],
//             borderWidth: 1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       };

//       chartRef.current = new Chart(ctx, config);
//     } else {
//       chartRef.current.data.datasets[0].data = categoryData.map(item => item.totalAmount);
//       // Retain labels if they are intended to be consistent
//       chartRef.current.data.labels = categoryData.map(item => item.category);
//       // eslint-disable-next-line
//       chartRef.current.update();
//     }
//   }, [categoryData]);


//     // useEffect(() => {
//     //     const ctx = document.getElementById('myChar') as HTMLCanvasElement;

//     //     if (!chartRef.current) {
//     //     const config: ChartConfiguration<'bar'> = {
//     //         type: 'bar',
//     //         data: {
//     //         labels: [],
//     //         datasets: [{
//     //             label: 'Expense',
//     //             data: categoryData.map(item=>item.totalAmount),
//     //             backgroundColor: [
//     //             'rgba(255, 99, 132, 0.2)',
//     //     'rgba(255, 159, 64, 0.2)',
//     //     'rgba(255, 205, 86, 0.2)',
//     //     'rgba(75, 192, 192, 0.2)',
//     //     'rgba(54, 162, 235, 0.2)',
//     //     'rgba(153, 102, 255, 0.2)',
//     //             ],
//     //             borderColor: [
//     //             'rgb(255, 99, 132)',
//     //             'rgb(255, 159, 64)',
//     //             'rgb(255, 205, 86)',
//     //             'rgb(75, 192, 192)',
//     //             'rgb(54, 162, 235)',
//     //             'rgb(153, 102, 255)'
//     //             ],
//     //             borderWidth: 1
//     //         }]
//     //         },
//     //         options: {
//     //         scales: {
//     //             y: {
//     //             beginAtZero: true
//     //             }
//     //         }
//     //         }
//     //     };

//     //     chartRef.current = new Chart(ctx, config);
//     //     } else  {
//     //         chartRef.current.data.datasets[0].data = categoryData.map(item=>item.totalAmount);
//     //         chartRef.current.data.labels = []
//     //         chartRef.current.update();
//     //     }
//     // }, [categoryData]);

//   return (
//     <div className="h-96 w-96 mt-20">
//       <canvas id="myChar"></canvas>
//     </div>
//   );
// };

// export default BarChart;
export {}