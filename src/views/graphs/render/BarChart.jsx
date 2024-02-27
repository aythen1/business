import React, {useEffect, useState} from "react";
// import ChartistGraph from "react-chartist";

// import { PieChart, BarChart } from 'chartist';


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



const initialData = {
  series: [50, 10, 30, 40],
};



const BarChart = ({value = initialData}) =>  {
    const [id] = useState(generateID())

    // console.log('id')

  
    useEffect(() => {
        new Chartist.Pie(`#chart-${id}`, value, {
          donut: true,
          donutWidth: 20,
          donutSolid: true,
          startAngle: 270,
          showLabel: true
        });
    }, [])
      
  return (
    // <div style={{position:'relative'}}>
      <div id={`chart-${id}`} className={'box-chart'}/>
    // </div>
  );
}

export default BarChart