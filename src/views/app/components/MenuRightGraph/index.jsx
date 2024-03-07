import React from 'react';

import styles from "./index.module.css";
import * as Graphs from '@/views/graphs/render';  
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import {
  addDashboard
} from '@/actions/dashboard'

import {
  initialComponent
} from '@/slices/dashboardSlice'


const DraggableGraph = ({ graphType, Component }) => {
  const dispatch = useDispatch();


  const component = {
    ...initialComponent,
    id: uuidv4(),
    type: graphType,
    index: 0,
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'DRAGGABLE_ITEM',  
    item: component,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  });


  const _addComponent = (graph) => {
    dispatch(addDashboard(graph));
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



const MenuRightGraph = () => {
  const componentGraph = [
    'LineScatter',
    'SimpleLineChart',
    'SimpleLineStraightChart',
    'AreaLineChart',
    'BIPolarLineChart',
    'SeriesOverRides',
    'SeriesLine',
    'BIPolarBarChart',
    'OverlappingBars',
    'MultiLineLabels',
    'StackedBarChart',
    'HorizontalBarChart',
    'DistributedSeries',
    'SimplePieChart',
    'GaugeChart',
    'DonutChart',
    'BarChart',
  ];


  return (
      <div className={styles["grid-2"]}>
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


export default MenuRightGraph;

