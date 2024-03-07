import "reactflow/dist/style.css"

import { useMemo } from 'react';
import Chat from "./chat"

export const baseChat= {
  id: "",
  data: { question: "", answer: "" },
  dragHandle: ".drag-handle",
  selected: false,
  type: "chat",
  position: { x: 0, y: 0 },
}

export const nodeTypes = {
  chat: Chat,
}

// export const nodeTypes = useMemo(
//   () => ({
//     chat: Chat,
//   }),
//   [],
// );


export const fitViewOptions = {
  padding: 10,
  minZoom: 1,
  maxZoom: 2,
}