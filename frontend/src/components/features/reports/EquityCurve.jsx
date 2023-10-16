import {Line} from "react-chartjs-2"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement} from "chart.js"



ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default function EquityCurve(props){

    function getLabels(){
        const labels = []
        for (let i of props.data) {
            labels.push("")
        }
        return labels
    }

    const [min, max] = [Math.min(...props.data), Math.max(...props.data)]

    const data = {
        labels:getLabels(),
        datasets: [{
            labels: 'Equity Curve',
            data: [...props.data],
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
        }]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                min: min - 0.1*min,
                max: max + 0.1*max
            }
        }
    }
    return <div className="w-96 h-96">
        <Line data={data} options={options} className="h-96 w-96" />

    </div>
}