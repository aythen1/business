import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'


const initialData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
  ]
};


const OverlappingBars = ({ value = initialData }) => {
    const [id] = useState(generateID())

    useEffect(() => {

          
          
          var options = {
            seriesBarDistance: 10
          };
          
          var responsiveOptions = [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];
          
          new Chartist.Bar(`#chart-${id}`, value, options, responsiveOptions);
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default OverlappingBars