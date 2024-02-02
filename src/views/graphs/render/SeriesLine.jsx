import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'



const SeriesLine = () => {
    const [id] = useState(generateID())

    useEffect(() => {
            new Chartist.Line(`#chart-${id}`, {
              series: [[
                {x: 1, y: 100},
                {x: 2, y: 50},
                {x: 3, y: 25},
                {x: 5, y: 12.5},
                {x: 8, y: 6.25}
              ]]
            }, {
              axisX: {
                type: Chartist.AutoScaleAxis,
                onlyInteger: true
              },
              axisY: {
                type: Chartist.FixedScaleAxis,
                ticks: [0, 50, 75, 87.5, 100],
                low: 0
              },
              lineSmooth: Chartist.Interpolation.step(),
              showPoint: false
            });
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default SeriesLine