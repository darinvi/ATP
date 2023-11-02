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
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function TradeChart() {

    const trades = useSelector(state => state.entities.reports.currentData)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                // display: false
            },
            title: {
                // display: false,
                text: 'Equity Curve',
            },
        },
    };

    const labels = trades.map(t => t.net)

    const data = {
        labels: labels.map(e => ""),
        datasets: [
            {
                label: 'Original',
                data: getCumSums(trades),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Filtered',
                data: getCumSums(trades.filter(t => t.filtered !== false)),
                borderColor: 'blue',
                backgroundColor: 'blue',
            }
        ],
    };

    function getCumSums(data) {
        let cumSum = 0;
        const cumulativeSums = data.map(e => e.net).map((num) => {
            cumSum += num;
            return cumSum;
        });
        return cumulativeSums
    }

    return (
        <div style={{ width: "800px", height: "400px" }}>
            <Line options={options} data={data} />
        </div>
    )
}
