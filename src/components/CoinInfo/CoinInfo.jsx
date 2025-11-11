import Alert from "../Alert/Alert";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
import { chartDays } from "../../helpers/constants";
Chart.register(CategoryScale);

function CoinInfo({ historicData, setDays, setCoinInterval, days, currency }) {

    function handleDayChange(event) {
        const daySelect = event.target.options[event.target.selectedIndex].value;
        if (daySelect == 1) {
            setCoinInterval?.('');
        } else {
            setCoinInterval?.('daily');
        }
        setDays?.(event.target.options[event.target.selectedIndex].value);
    }

    if (!historicData) {
        return <Alert message="No data available" type="warning" />
    }

    return (
        <div className="flex flex-col items-center justify-center mt-6 p-6 w-full h-[80vh]">
            <Line
                data={{
                    labels: historicData.prices.map(coinPrice => {
                        let date = new Date(coinPrice[0]);
                        let time = date?.getHours() > 12 ? `${date?.getHours() - 12}:${date?.getMinutes()} PM` : `${date?.getHours()}:${date?.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [
                        {
                            label: `Price (Past ${days} ${days === 1 ? 'Day' : 'Days'} in ${currency?.toUpperCase()})`,
                            data: historicData.prices.map(coinPrice => coinPrice[1]),
                        }

                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        point: {
                            tension: 0.4,
                            radius: 0,
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#ddd",
                                autoSkip: true,
                                maxTicksLimit: 10,
                            },
                            title: {
                                display: true,
                                text: days === 1 ? "Time (Hours)" : "Date",
                                color: "#ccc",
                            },
                        },
                        y: {
                            ticks: {
                                color: "#ddd",
                                callback: (value) =>
                                    `${currency === "usd" ? "$" : "₹"}${value.toLocaleString()}`,
                            },
                            title: {
                                display: true,
                                text: `Price (${currency.toUpperCase()})`,
                                color: "#ccc",
                            },
                        }
                    }
                }}
            />

            <div className="flex justify-center mt-5 w-full">
                <select onChange={handleDayChange} className="select select-primary w-full max-w-xs">
                    {chartDays.map((day, index) => {
                        return (
                            <option selected={days == day.value} key={index} value={day.value}>{day.label}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default CoinInfo;