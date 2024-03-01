import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'


const initialData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
    ],
}

const SimpleLineChart = ({value = initialData}) => {
    const [id] = useState(generateID())

    useEffect(() => {
        new Chartist.Line(`#chart-${id}`, value);
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default SimpleLineChart