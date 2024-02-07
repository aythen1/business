import React, { useEffect, useState } from "react";
import { PieChart } from 'chartist';

import './BarChart.css';

function generateID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomCode = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}

const BarCharts = () => {
  const [id] = useState(generateID());

  const data = {
    series: [50, 10, 30, 40],
  };

  const colors = ['red', 'green', 'blue', 'yellow']; // Asigna colores según tus necesidades


  useEffect(() => {
    new PieChart(`#chart-${id}`, data, {
      donut: true,
      donutWidth: 18,
      donutSolid: true,
      donutSolidColor: colors, // Proporciona el array de colores
      startAngle: 270,
      showLabel: true,
      chartPadding: 0,
    });
  }, [id, colors]);

  return (
    <div id={`chart-${id}`} className={'box-chart'} />
  );
}

export default BarCharts;