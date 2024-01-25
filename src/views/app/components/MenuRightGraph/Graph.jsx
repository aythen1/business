import React, { useMemo } from 'react';
// import { useMemo } from 'react';

import styles from "./Graph.module.css";
import * as Graphs from '@/views/graphs';  // Importar todos los componentes desde el archivo index.js
import { useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';

import {
  addComponent
} from '@/actions/component'

import {
  initialComponent
} from '@/slices/componentSlice'


const DraggableGraph = ({ graphType, Component }) => {
  const dispatch = useDispatch();


  const initialComponentIndex = {
    ...initialComponent,
    index: 0,
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'DRAGGABLE_ITEM',  // Especifica el tipo de elemento
    item: initialComponentIndex,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });


  const _addComponent = (graph) => {
    dispatch(addComponent(graph));
  };

  return (
    <div
      ref={drag}
      className={`${styles.grid} ${isDragging ? 'dragging' : ''}`}
      onClick={() => _addComponent(graphType)}
      style={{
        cursor: 'grab',
      }}
    >
      <div className={styles.graph}>

      <Component />
      </div>
    </div>
  );
};



const Graph = () => {
  const componentGraph = [
    "BarChartBorderRadius",
    "BubbleChart",
    "ComboBarLine",
    "DoughnutChart",
    "FloatingBarChart",
    "HorizontalBarChart",
    "LineChart",
    "LineStyling",
    "MultiSeriesPie",
    "PieChart",
    "PolarArea",
    "Radar",
    "ScatterChart",
    "StackedBarChart",
    "SteppedLineChart"
  ];


  return (
      <div className={styles["grid-3"]}>
        {componentGraph.map((graph, index) => {
          const Component = Graphs[graph];
          return (
            <DraggableGraph
              key={index}
              graphType={graph}
              Component={Component}
            />
          );
        })}
        </div>
  );
};


export default Graph;

