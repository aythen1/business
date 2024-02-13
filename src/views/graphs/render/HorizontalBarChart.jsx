import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'




const initialData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  series: [
    [5, 4, 3, 7, 5, 10, 3],
    [3, 2, 9, 5, 4, 6, 4]
  ]
}




const HorizontalBarChart = ({ value =  initialData }) => {
    const [id] = useState(generateID())

    useEffect(() => {

        new Chartist.Bar(`#chart-${id}`, value, {
          seriesBarDistance: 10,
          reverseData: true,
          horizontalBars: true,
          axisY: {
            offset: 70
          }
        });
          
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default HorizontalBarChart