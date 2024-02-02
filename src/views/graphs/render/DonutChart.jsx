import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'


const DonutChart = () => {
    const [id] = useState(generateID())

    useEffect(() => {
        
        new Chartist.Pie(`#chart-${id}`, {
          series: [20, 10, 30, 40]
        }, {
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