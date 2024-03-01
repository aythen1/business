import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'


var initialData = {
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
  series: [
    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
  ]
};





const BIPolarLineChart = ({ value = initialData }) => {
    const [id] = useState(generateID())

    useEffect(() => {

          
          
          var options = {
            high: 10,
            low: -10,
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return index % 2 === 0 ? value : null;
              }
            }
          };
          
          new Chartist.Bar(`#chart-${id}`, value, options);
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default BIPolarLineChart