import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function StatsBarChart() {

    const divData = useSelector(state => state.entities.backtests.dividends);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                //   display: true,
                text: 'Chart.js Bar Chart',
            },
            labels: {
                display: false
            }
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Open(vsFlat)',
                data: divData.chartData.open_against_flat,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Close(vsOpen)',
                data:  divData.chartData.closes_against_open,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Close(vsFlat)',
                data: divData.chartData.closes_against_flat,
                backgroundColor: 'orange',
            },
        ],
    };

    function getLabels(){

    }

    return (
        <div style={{ width: '500px' }}>
            <Bar options={options} data={data} />;
        </div>
    )
}
