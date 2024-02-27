// userSlice.js
import { createSlice } from '@reduxjs/toolkit';


import {
  addVector,
  updateVector,
  addVectorData,

  openVector,
  openFile,
  loadVector,
  deleteVector,
  removeAllVector,
  fetchsVector,
  fetchVector,
  getAllVector
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

  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
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

    // .addCase(openFile.fulfilled, (state, action) => {

    // })

    // .addCase(loadVector.fulfilled, (state, action) => {

    // })

    // .addCase(addVector.fulfilled, (state, action) => {

    // })

    // .addCase(updateVector.fulfilled, (state, action) => {

    // })

    // .addCase(deleteVector.fulfilled, (state, action) => {

    // })

    // .addCase(removeAllVector.fulfilled, (state, action) => {

    // })

    // .addCase(getVector.fulfilled, (state, action) => {

    // })

    // .addCase(getAllVector.fulfilled, (state, action) => {

    // })
  },
});

export const {
  setVector,
  setVectors
} = vectorSlice.actions;

export default vectorSlice.reducer;













