import { createSlice } from '@reduxjs/toolkit';


import {
  addVector,
  updateVector,
  addVectorData,

  deleteVector,
  fetchsVector,
  fetchVector,
} from '@/actions/vector'






const vectorSlice = createSlice({
  name: 'vector',
  initialState: {

    vector: null,
    vectors: []
  },
  reducers: {
    setVector: (state, action) => {
      state.vector = action.payload
    },
    setVectors: (state, action) => {
      state.vectors = action.payload
    },
    setDimension: (state, action) => {
      state.dimension = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchsVector.fulfilled, (state, action) => {
        state.vectors = action.payload
      })
      .addCase(fetchVector.fulfilled, (state, action) => {
        state.vector = action.payload
      })

      .addCase(addVector.fulfilled, (state, action) => {
        state.vector = action.payload
        state.vectors.push(action.payload)
      })

      .addCase(updateVector.fulfilled, (state, action) => {
        state.vector = action.payload

        const index = state.vectors.findIndex(vector => vector.id === action.payload.id);
        if (index !== -1) {
          state.vectors[index] = action.payload;
        }
      })


      .addCase(addVectorData.fulfilled, (state, action) => {
        console.log('addVectorData', action.payload)
        // state.vector = action.payload
      })

      .addCase(deleteVector.fulfilled, (state, action) => {
        console.log('2200', action.payload)

        const { id } = action.payload;

        state.vectors = state.vectors.filter(vector => vector.id !== id);

        state.vector = null;
      })

  },
});

export const {
  setVector,
  setVectors,
  setDimension
} = vectorSlice.actions;

export default vectorSlice.reducer;













