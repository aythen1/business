// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { 
  addDashboard 
} from '@/actions/dashboard'


const initialContent = {
  name: '23r',
  order: 0
}

const initialData = {
  name: '23r',
  order: 0
}



const initialDashboard = {
  id: '',
  owner: '',

  size: '',
  data: [initialData],

  title: 'new dashboard',
  description: 'new description',
  content: [initialContent],

  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
}


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    currentDashboard: initialDashboard,
    dashboards: [],
    
    loading: false,
    status: 'idle', 
    error: null,
  },
  reducers: {
    setDashboard: (state, action) => {
      // lógica para manejar la acción 'setUser'
    },
    // otras acciones...
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder
      .addCase(addDashboard.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addDashboard.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.dashboards = [...state.dashboards, initialDashboard];
        // state.dashboards = [...state.dashboards, ...action.payload];
      })
      .addCase(addDashboard.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { setDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;