import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'




const BIPolarLineChart = () => {
    const [id] = useState(generateID())

    useEffect(() => {
          new Chartist.Line(`#chart-${id}`, {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [1, 2, 3, 1, -2, 0, 1, 0],
              [-2, -1, -2, -1, -2.5, -1, -2, -1],
              [0, 0, 0, 1, 2, 2.5, 2, 1],
              [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
            ]
          }, {
            high: 3,
            low: -3,
            showArea: true,
            showLine: false,
            showPoint: false,
            fullWidth: true,
            axisX: {
              showLabel: false,
              showGrid: false
            }
          });
          
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default BIPolarLineChart