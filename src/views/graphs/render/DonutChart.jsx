import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'





const initialData = {
  series: [20, 10, 30, 40]
}


const DonutChart = ({ value = initialData }) => {
    const [id] = useState(generateID())

    useEffect(() => {
        
        new Chartist.Pie(`#chart-${id}`, value, {
          donut: true,
          donutWidth: 60,
          donutSolid: true,
          startAngle: 270,
          showLabel: true
        });
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default DonutChart