import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineGraph({id, dataset, labels, name, color}) {
  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: "rgba(91, 78, 119, 1)",
      half: "rgba(91, 78, 119, 0.5)",
      quarter: "rgba(91, 78, 119, 0.25)",
      zero: "rgba(91, 78, 119, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    },
    red: {
      default: "rgba(239, 130, 117, 1)",
      half: "rgba(239, 130, 117, 0.5)",
      quarter: "rgba(239, 130, 117, 0.25)",
      zero: "rgba(239, 130, 117, 0)"
    },
    green: {
      default: "rgba(102, 143, 128, 1)",
      half: "rgba(102, 143, 128, 0.5)",
      quarter: "rgba(102, 143, 128, 0.25)",
      zero: "rgba(102, 143, 128, 0)"
    },
    blue: {
      default: "rgba(146, 180, 244, 1)",
      half: "rgba(146, 180, 244, 0.5)",
      quarter: "rgba(146, 180, 244, 0.25)",
      zero: "rgba(146, 180, 244, 0)"
    },
    pink: {
      default: "rgba(255, 140, 198, 1)",
      half: "rgba(255, 140, 198, 0.5)",
      quarter: "rgba(255, 140, 198, 0.25)",
      zero: "rgba(255, 140, 198, 0)"
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

    const gradientBlue = ctx.createLinearGradient(0, 16, 0, 600);
    gradientBlue.addColorStop(0, colors.blue.half);
    gradientBlue.addColorStop(0.65, colors.blue.quarter);
    gradientBlue.addColorStop(1, colors.blue.zero);

    const gradientPink = ctx.createLinearGradient(0, 16, 0, 600);
    gradientPink.addColorStop(0, colors.pink.half);
    gradientPink.addColorStop(0.65, colors.pink.quarter);
    gradientPink.addColorStop(1, colors.pink.zero);

    let gradient;
    let borderColor;
    let pointBackgroundColor;

    if ( color === "red" ) {
        gradient = gradientRed;
        borderColor = colors.red.default;
        pointBackgroundColor = colors.red.default;
    } else if ( color === "purple" ) {
        gradient = gradientPurple;
        borderColor = colors.purple.default;
        pointBackgroundColor = colors.purple.default;
    } else if ( color === "green" ) {
        gradient = gradientGreen;
        borderColor = colors.green.default;
        pointBackgroundColor = colors.green.default;
    } else if ( color === "pink" ) {
        gradient = gradientPink;
        borderColor = colors.pink.default;
        pointBackgroundColor = colors.pink.default;
    } else if ( color === "blue" ) {
        gradient = gradientBlue;
        borderColor = colors.blue.default;
        pointBackgroundColor = colors.blue.default;
    } else if ( color === "green" ) {
        gradient = gradientGreen;
        borderColor = colors.green.default;
        pointBackgroundColor = colors.green.default;
    } else {
        gradient = gradientPurple;
        borderColor = colors.purple.default;
        pointBackgroundColor = colors.purple.default;
    }

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: name,
          data: dataset,
          borderColor: borderColor,
          pointBackgroundColor: pointBackgroundColor,
          fill: true,
          cubicInterpolationMode: 'monotone',
          borderWidth: 2,
          tension: 0.4
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
    <div className="chart" style={{width: "100%"}}>
      <h2>Chart: {name}</h2>
      <canvas id="myChart" ref={canvasEl} height="100" style={{height: "40vh", width: "100%"}} />
    </div>
  );
}
