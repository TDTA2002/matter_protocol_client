import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon'; // Import adapter thời gian

const MyChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const jsonData = [
                {
                    "id": 60,
                    "Date": "2023-10-21T08:24:59.000Z",
                    "timestamp": 12,
                },
                {
                    "id": 61,
                    "Date": "2023-10-22T08:24:59.000Z",
                    "timestamp": 4,
                }
                ,
                {
                    "id": 62,
                    "Date": "2023-10-23T08:24:59.000Z",
                    "timestamp": 6,
                }
            ];

            jsonData.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

            const data = {
                labels: jsonData.map(entry => new Date(entry.Date)),
                datasets: [
                    {
                        label: 'Timestamp',
                        data: jsonData.map(entry => entry.timestamp),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            const ctx = chartRef.current?.getContext('2d');

            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                },
                                title: {
                                    display: true,
                                    text: 'Ngày',
                                },
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, []);

    return (
        <div>
            <canvas ref={chartRef} width={200} height={100} />
        </div>
    );
};

export default MyChart;
