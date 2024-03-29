import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'



const initialData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [
    [5, 9, 7, 8, 5, 3, 5, 4]
  ]
}

const AreaLineChart = ({value = initialData}) => {
    const [id] = useState(generateID())

    useEffect(() => {
        new Chartist.Line(`#chart-${id}`, value, {
            low: 0,
            showArea: true
          });
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default AreaLineChart