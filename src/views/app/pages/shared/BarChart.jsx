import React, {useEffect} from "react";
// import ChartistGraph from "react-chartist";

import { PieChart, BarChart } from 'chartist';
// import 'chartist/dist/index.css';
import './BarChart.css'

const BarCharts = ( ) =>  {
    const data = {
        series: [50, 10, 30, 40],
      };

    useEffect(() => {
        new PieChart('#chart', data, {
            donut: true,
            donutWidth: 18, // Ancho del hueco
            startAngle: 270,
            showLabel: true,
            chartPadding: 0, // Ajusta el espaciado del gráfico
            // labelInterpolationFnc: (value) => `${value}%`, // Personaliza la forma en que se muestran las etiquetas

          });
    }, [])
      
  return (
    <div className="App" style={{position:'relative'}}>
      <div id="chart" />
    </div>
  );
}

export default BarCharts