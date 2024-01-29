// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { 
  fetchsPivot,
  fetchPivot,
  addPivot,
  updatePivot,
  deletePivot
} from '@/actions/pivot'

export const initialComponent = {
  id: '',
  version: '',
  owner: '',

  public: true,
  title: '',
  description: '',
  type: 'graph|html|form',

  styles: {
    columnSize: 6
  },

  filter: '',
  filterSQL: '',
  filterGraph: '',

  promptId: '',
  sharedId: '',
  dataId: '',

  updatedAt: '',
  createdAt: ''
}

const pivotSlice = createSlice({
  name: 'pivot',
  initialState: {
    status: 'pending',
    loading: false,

    component: initialComponent,
    components: [
      initialComponent
    ]
  },
  reducers: {
    setPivot: (state, action) => {
      // lógica para manejar la acción 'setUser'
    },
    // otras acciones...
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder
      .addCase(fetchsPivot.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(fetchsPivot.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loading = false;
        state.components = action.payload;
      })
      .addCase(fetchsPivot.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchPivot.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPivot.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.component = action.payload;
      })
      .addCase(fetchPivot.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(addPivot.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addPivot.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = [...state.components, action.payload];
        
      })
      .addCase(addPivot.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

    
      .addCase(updatePivot.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updatePivot.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(updatePivot.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(deletePivot.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deletePivot.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(deletePivot.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


  },
});

export const { setPivot } = pivotSlice.actions;
export default pivotSlice.reducer;