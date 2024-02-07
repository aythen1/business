// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { 
  fetchsDashboard,
  fetchDashboard,
  addDashboard,
  updateDashboard,
  deleteDashboard
} from '@/actions/dashboard'
// import dashboard from '../../service/controllers/dashboard';

export const initialComponent = {     
  id: '',
  available: '',
  type: '',
  position: '',  
  title: '',
  description: '',
  columnSize: '',
  style: '',
  vector: '',
  filter: '',
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    status: 'pending',
    loading: false,

    status: null,

    dashboard: null,
    dashboards: [],

    component: {},
    components: [
      initialComponent
    ]
  },
  reducers: {
    setDashboard: (state, action) => {
      // lógica para manejar la acción 'setUser'
      state.dashboard = action.payload
      // state.components = JSON.parse(state.dashboard.components)
    },
    deleteComponent: (state, action) => {
      console.log('deleteComponent', action.payload)
      const deleteIds = action.payload.map(item => item.id);
      state.components = state.components.filter(component => !deleteIds.includes(component.id));
      state.status = 'save'

      state.dashboard.components = state.components;
    },
    setComponent: (state, action) => {
      state.component = action.payload;
    },
    setComponents: (state, action) => {
      state.components = action.payload;
      state.dashboard.components = action.payload;
    },
    addComponent: (state, action) => {
      console.log('add com', action.payload)
      state.components.push(action.payload)
      state.dashboard.components = state.components
      state.status = 'save'
    }
    // otras acciones...
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder
      .addCase(fetchsDashboard.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(fetchsDashboard.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loading = false;
        state.dashboards = action.payload;
      })
      .addCase(fetchsDashboard.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchDashboard.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        console.log('ee', action.payload)
        state.component = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(addDashboard.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addDashboard.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.dashboard = action.payload
        state.dashboards.push(action.payload);
      })
      .addCase(addDashboard.rejected, (state, action) => {
        state.save = 'rejected';
        state.error = action.error.message;
      })

    
      .addCase(updateDashboard.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateDashboard.fulfilled, (state, action) => {
        state.status = 'save';
        // state.dashboards = action.payload;
      })
      .addCase(updateDashboard.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(deleteDashboard.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteDashboard.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.dashboards = action.payload;
      })
      .addCase(deleteDashboard.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


  },
});

export const { 
  setDashboard,
  addComponent,
  deleteComponent,
  setComponent,
  setComponents,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;