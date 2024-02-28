import React, { useEffect, useState } from "react";
import { generateID } from './utils'

import './BarChart.css'

const initialData = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
  series: [{
    name: 'series-1',
    data: [5, 2, -4, 2, 0, -2, 5, -3]
  }, {
    name: 'series-2',
    data: [4, 3, 5, 3, 1, 3, 6, 4]
  }, {
    name: 'series-3',
    data: [2, 4, 3, 1, 4, 5, 3, 2]
  }]
}

const SeriesOverRides = ({ value = initialData }) => {
    const [id] = useState(generateID())

    useEffect(() => {
          var chart = new Chartist.Line(`#chart-${id}`, value, {
            fullWidth: true,
            // Within the series options you can use the series names
            // to specify configuration that will only be used for the
            // specific series.
            series: {
              'series-1': {
                lineSmooth: Chartist.Interpolation.step()
              },
              'series-2': {
                lineSmooth: Chartist.Interpolation.simple(),
                showArea: true
              },
              'series-3': {
                showPoint: false
              }
            }
          }, [
            // You can even use responsive configuration overrides to
            // customize your series configuration even further!
            ['screen and (max-width: 320px)', {
              series: {
                'series-1': {
                  lineSmooth: Chartist.Interpolation.none()
                },
                'series-2': {
                  lineSmooth: Chartist.Interpolation.none(),
                  showArea: false
                },
                'series-3': {
                  lineSmooth: Chartist.Interpolation.none(),
                  showPoint: true
                }
              }
            }]
          ]);
    }, [])

    return (
        <div id={`chart-${id}`} className={'box-chart'} />
    );
}

export default SeriesOverRides