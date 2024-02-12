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
      console.log('fetchsVector', action.payload)
      state.vector = action.payload
    })
    
    .addCase(addVector.fulfilled, (state, action) => {
      state.vector = action.payload
    })
    
    .addCase(updateVector.fulfilled, (state, action) => {
      state.vector = action.payload
    })
    
    
    .addCase(addVectorData.fulfilled, (state, action) => {
      console.log('addVectorData', action.payload)
      // state.vector = action.payload
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













