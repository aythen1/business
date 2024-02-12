import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'


const initialData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    [800000, 1200000, 1400000, 1300000],
    [200000, 400000, 500000, 300000],
    [100000, 200000, 400000, 600000]
  ]
}

const StackedBarChart = ({ value = initialData }) => {
    const [id] = useState(generateID())

    useEffect(() => {

        new Chartist.Bar(`#chart-${id}`, value, {
          stackBars: true,
          axisY: {
            labelInterpolationFnc: function(value) {
              return (value / 1000) + 'k';
            }
          }
        }).on('draw', function(data) {
          if(data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 30px'
            });
          }
        });
        
          
          
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default StackedBarChart