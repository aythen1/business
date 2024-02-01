import React, {useEffect, useState} from "react";
// import ChartistGraph from "react-chartist";

import { PieChart, BarChart } from 'chartist';


// import 'chartist/dist/index.css';
import './BarChart.css'


function generateID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomCode = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}


const BarCharts = ( ) =>  {
    const [id] = useState(generateID())

    // console.log('id')

    const data = {
        series: [50, 10, 30, 40],
      };

    useEffect(() => {
        new PieChart(`#chart-${id}`, data, {
            donut: true,
            donutWidth: 18, // Ancho del hueco
            startAngle: 270,
            showLabel: true,
            chartPadding: 0, // Ajusta el espaciado del gráfico
            // labelInterpolationFnc: (value) => `${value}%`, // Personaliza la forma en que se muestran las etiquetas

          });
    }, [])
      
  return (
    // <div style={{position:'relative'}}>
      <div id={`chart-${id}`} className={'box-chart'}/>
    // </div>
  );
}

export default BarCharts