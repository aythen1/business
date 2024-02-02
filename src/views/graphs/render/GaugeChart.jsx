import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'




const GaugeChart = () => {
  const [id] = useState(generateID())

  useEffect(() => {

    new Chartist.Pie(`#chart-${id}`, {
      series: [20, 10, 30, 40]
    }, {
      donut: true,
      donutWidth: 60,
      donutSolid: true,
      startAngle: 270,
      total: 200,
      showLabel: true
    });

  }, [])

  return (
    <div id={`chart-${id}`} className={'box-chart'} style={{ marginTop: '20%' }} />
  );
}

export default GaugeChart