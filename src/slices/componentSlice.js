// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { 
  fetchsComponent,
  fetchComponent,
  addComponent,
  updateComponent,
  deleteComponent
} from '@/actions/component'

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

const componentSlice = createSlice({
  name: 'component',
  initialState: {
    status: 'pending',
    loading: false,

    component: initialComponent,
    components: [
      initialComponent
    ]
  },
  reducers: {
    setComponent: (state, action) => {
      // lógica para manejar la acción 'setUser'
    },
    // otras acciones...
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder
      .addCase(fetchsComponent.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(fetchsComponent.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loading = false;
        state.components = action.payload;
      })
      .addCase(fetchsComponent.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchComponent.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchComponent.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.component = action.payload;
      })
      .addCase(fetchComponent.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(addComponent.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addComponent.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = [...state.components, action.payload];
        
      })
      .addCase(addComponent.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

    
      .addCase(updateComponent.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateComponent.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(updateComponent.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(deleteComponent.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteComponent.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(deleteComponent.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


  },
});

export const { setComponent } = componentSlice.actions;
export default componentSlice.reducer;