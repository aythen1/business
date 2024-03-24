import React from 'react';
import { useStore } from 'reactflow';

export default ({ fromX, fromY, toX, toY }) => {
  const { connectionHandleId } = useStore();
//   const { connectionColor } = useStore();

console.log('connectionColor', connectionHandleId)

const strokeColor = connectionHandleId.endsWith('_bottom') ? 'var(--color-primary-0)' : 'blue';

  return (
    <g>
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={3}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="var(--color-primary-0)"
        r={1}
        stroke={strokeColor}
        strokeWidth={1.5}
      />
    </g>
  );
};
