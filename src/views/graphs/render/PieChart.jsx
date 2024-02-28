import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'




var datainitialData = {
  labels: ['Bananas', 'Apples', 'Grapes'],
  series: [20, 15, 40]
};




const PieChart = ({ value = initialData }) => {
    const [id] = useState(generateID())

    useEffect(() => {
              
              var options = {
                labelInterpolationFnc: function(value) {
                  return value[0]
                }
              };
              
              var responsiveOptions = [
                ['screen and (min-width: 640px)', {
                  chartPadding: 30,
                  labelOffset: 100,
                  labelDirection: 'explode',
                  labelInterpolationFnc: function(value) {
                    return value;
                  }
                }],
                ['screen and (min-width: 1024px)', {
                  labelOffset: 80,
                  chartPadding: 20
                }]
              ];
              
              new Chartist.Pie(`#chart-${id}`, value, options, responsiveOptions);
          
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default PieChart