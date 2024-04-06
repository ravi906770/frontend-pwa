import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

const FakeChart3: React.FC = () => {
    const chartRef = useRef<Chart<"line", unknown> | null>(null);

    useEffect(() => {
        const ctx = document.getElementById('Chart3') as HTMLCanvasElement;

        if (ctx && !chartRef.current) {
            const config: ChartConfiguration<'line'> = {
                type: 'line',
                data: {
                    labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()), // Labels for the days of March
                    datasets: [{
                        label: 'Expense', // Label for the dataset
                        data: [200, 150, 180, 220, 250, 300, 280, 320, 300, 280, 350, 400, 380, 420, 450, 500, 520, 480, 550, 600, 580, 620, 650, 700, 720, 680, 750, 800, 780, 820], // Dummy expense data for each day of March
                        borderColor: ['rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(205, 133, 63)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(205, 133, 63)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(205, 133, 63)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(205, 133, 63)',
                        'rgb(255, 99, 132)'],
                        borderWidth: 1,
                        fill: false // Ensure the line chart is not filled
                    }]
                },
                options: {
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'March Expense Chart'
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            beginAtZero: true,
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                    }
                },
            };

            chartRef.current = new Chart(ctx, config);
        } else if (chartRef.current) {
            chartRef.current.update(); // Update the chart
        }
    }, []);

    return (
        <div className="sm:h-120 sm:w-250 w-full h-full">
            <canvas id="Chart3"></canvas>
        </div>
    );
};

export default FakeChart3;
