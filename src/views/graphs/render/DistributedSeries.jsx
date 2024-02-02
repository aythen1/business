import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'




const DistributedSeries = () => {
    const [id] = useState(generateID())

    useEffect(() => {
            new Chartist.Bar(`#chart-${id}`, {
              labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
              series: [20, 60, 120, 200, 180, 20, 10]
            }, {
              distributeSeries: true
            });
          
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default DistributedSeries