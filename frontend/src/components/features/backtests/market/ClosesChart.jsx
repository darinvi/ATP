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


export default function ClosesChart(props){
    
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

    const [labels, chartData] = getChartData();

    const data = {
        labels,
        datasets: [
            {
                label: props.label,
                data: chartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    // want to make sure order is correct.
    function getChartData(){
        let labels = [];
        let data = [];
        for (let [key, val] of Object.entries(props.data)) {
            labels.push(key);
            data.push(val);
        }
        return [labels, data];
    }

    return (
        <div style={{ width: "800px", height: "400px" }}>
            <Line options={options} data={data} />
        </div>
    )
}

