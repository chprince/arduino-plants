import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function App({id, timeDataset, humidityDataset, tempDataset, brightnessDataset}) {
  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    },
    red: {
      default: "rgba(255, 0, 0, 1)",
      half: "rgba(255, 0, 0, 0.5)",
      quarter: "rgba(255, 0, 0, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    green: {
      default: "rgba(0, 255, 0, 1)",
      half: "rgba(0, 255, 0, 0.5)",
      quarter: "rgba(0, 255, 0, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradientPurple = ctx.createLinearGradient(0, 16, 0, 600);
    gradientPurple.addColorStop(0, colors.purple.half);
    gradientPurple.addColorStop(0.65, colors.purple.quarter);
    gradientPurple.addColorStop(1, colors.purple.zero);


    const gradientRed = ctx.createLinearGradient(0, 16, 0, 600);
    gradientRed.addColorStop(0, colors.red.half);
    gradientRed.addColorStop(0.65, colors.red.quarter);
    gradientRed.addColorStop(1, colors.red.zero);


    const gradientGreen = ctx.createLinearGradient(0, 16, 0, 600);
    gradientGreen.addColorStop(0, colors.green.half);
    gradientGreen.addColorStop(0.65, colors.green.quarter);
    gradientGreen.addColorStop(1, colors.green.zero);

    const temps = tempDataset;
    const humidity = humidityDataset;
    const brightness = brightnessDataset;

    const weight = [610.0, 120.2, 519.1, 641.4, 459.9, 660.2, 159.8, 258.6, 359.6, 459.2];
    const weight2 = [300, 260.2, 519.1, 611.4, 539.9, 610.2, 519.8, 518.6, 519.6, 539.2];

    // console.log(id);

    //timeDataset
    const labels = timeDataset;
    // const labels = [
    //   "Week 1",
    //   "Week 2",
    //   "Week 3",
    //   "Week 4",
    //   "Week 5",
    //   "Week 6",
    //   "Week 7",
    //   "Week 8",
    //   "Week 9",
    //   "Week 10"
    // ];
    
    console.log(temps);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradientRed,
          label: "Temperature",
          data: temps,
          fill: true,
          borderWidth: 2,
          borderColor: colors.red.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.red.default,
          pointRadius: 3
        },
        {
          backgroundColor: gradientPurple,
          label: "Brightness",
          data: brightness,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3
        },
        {
          backgroundColor: gradientGreen,
          label: "Humidity",
          data: humidity,
          fill: true,
          borderWidth: 2,
          borderColor: colors.green.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.green.default,
          pointRadius: 3
        }
      ]
    };
    const config = {
      type: "line",
      data: data
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="App">
      <span>Chart.js Demo</span>
      <canvas id="myChart" ref={canvasEl} height="100" style={{height: "40vh"}} />
    </div>
  );
}
