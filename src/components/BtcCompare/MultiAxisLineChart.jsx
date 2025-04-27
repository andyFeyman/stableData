import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MultiAxisLineChart = ({btcCompareData}) => {
    const toBillion = (numStr) => parseFloat(numStr.replace(/,/g, '')) / 1000000000;

    const chartData = {
        labels: btcCompareData.btcStage.map(item => item.time),
        datasets: [
            {
                label: 'BTC Market Cap',
                data: btcCompareData.btcStage.map(item => toBillion(item.btcMarketcap)),
                borderColor: 'rgb(255, 99, 132)',
                yAxisID: 'y',
            },
            {
                label: 'U.S Treasury Balance',
                data: btcCompareData.tgeStage.map(item => toBillion(item.TgaBalance)),
                borderColor: 'rgb(54, 162, 235)',
                yAxisID: 'y',
            },
            {
                label: 'U.S Stock Volume',
                data: btcCompareData.usaStockStage.map(item => toBillion(item.StockVol)),
                borderColor: 'rgb(75, 192, 192)',
                yAxisID: 'y',
            },
            {
                label: 'Federal Reserve Value',
                data: btcCompareData.h41Stage.map(item => toBillion(item.H41Value)),
                borderColor: 'rgb(153, 102, 255)',
                yAxisID: 'y1',
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Value (Billions)'
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Federal Reserve Value (Billions)'
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Bitcoin and Stock Market Trends Over Time</h2>
                {/* New Section */}
                <section className="mb-4">
                    
                    <p>
                        This chart shows the historical trends of Bitcoin's market capitalization, U.S Treasury Balance, USA Stock Volume, and the Federal Reserve's value over time. 
                    </p>
                    <p>
                        By comparing these data points, we can observe potential correlations and divergences between Bitcoin's performance and that of the broader stock market.
                    </p>
                    <p>
                        The timeline relies on Bitcoin's historical price peaks throughout its 4-year cycles.
                    </p>
                </section>
                {/* Chart */}
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default MultiAxisLineChart;