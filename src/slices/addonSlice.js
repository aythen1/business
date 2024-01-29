// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import { 
  fetchsAddon,
  fetchAddon,
  addAddon, 
  updateAddon, 
  
  visionAddon,
  codeAddon,

  ayAddon,
  rpaAddon,
  dataAddon
} from '@/actions/addon'

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

const addonSlice = createSlice({
  name: 'addon',
  initialState: {
    status: 'pending',
    loading: false,

    component: initialComponent,
    components: [
      initialComponent
    ]
  },
  reducers: {
    setAddon: (state, action) => {
      // lógica para manejar la acción 'setUser'
    },
    // otras acciones...
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder
      
      .addCase(fetchsAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(fetchsAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(fetchAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(fetchAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(addAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(addAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(updateAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(updateAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(visionAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(visionAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(codeAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(codeAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(ayAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(ayAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(rpaAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(rpaAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(dataAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(dataAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


  },
});

export const { setAddon } = addonSlice.actions;
export default addonSlice.reducer;