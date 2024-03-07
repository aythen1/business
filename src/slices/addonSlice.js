// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchsAddon,
  fetchAddon,
  addAddon,
  updateAddon,
  deleteAddon,

  fetchsVectorAddon,
  addVectorAddon,

  visionAddon,
  codeAddon,
  rpaAddon,
} from '@/actions/addon'

export const initialComponent = {
  id: '',
  owner: '',
  version: '',
  title: '',
  description: '',
  data: '',
  updatedAt: '',
  createdAt: ''
}

const addonSlice = createSlice({
  name: 'addons',
  initialState: {
    status: null,
    loading: false,

    code: null,
    vision: null,
    rpa: null,

    components: [],

    addon: {},
    addons: [],

    vector: {},
    vectors: []
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },

    setAddon: (state, action) => {
      state.addon = action.payload
    },
    setCode: (state, action) => {
      state.code = action.payload
    },
    setVision: (state, action) => {
      state.vision = action.payload
    },
    setRpa: (state, action) => {
      state.rpa = action.payload
    }
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder

      .addCase(fetchsAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.addons = action.payload;
      })
      .addCase(fetchsAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(fetchAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.addon = action.payload.addon;
        state.vectors = action.payload.vectors;
      })
      .addCase(fetchAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(addAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';

        console.log('aaaction', action.payload)
      
        const newAddon = action.payload;
        const existingAddonIndex = state.addons.findIndex((existingAddon) => existingAddon.id === newAddon.id);
      
        if (existingAddonIndex !== -1) {
          // El addon ya existe, actualízalo
          state.addons[existingAddonIndex] = { ...state.addons[existingAddonIndex], ...newAddon };
        } else {
          // El addon no existe, agrégalo
          state.addons.push(newAddon);
        }
      })

      .addCase(addAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(updateAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.addon = action.payload;
      })
      .addCase(updateAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(deleteAddon.fulfilled, (state, action) => {
        console.log('action', action.payload)
        state.addons = state.addons.filter(addon => addon.id !== action.payload);
      })


      .addCase(fetchsVectorAddon.fulfilled, (state, action) => {
        console.log('fetchsVectorAddon', action.payload)
        // state.vectors.push(action.payload)
      })
      .addCase(addVectorAddon.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        
        // state.vectors.push(action.payload)
      })


      .addCase(visionAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.vision = action.payload;
      })
      .addCase(visionAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(codeAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload.components;
        state.code = action.payload.components;
      })
      // .addCase(codeAddon.rejected, (state, action) => {
      //   state.status = 'rejected';
      //   // state.error = action.error.message;
      // })


      .addCase(rpaAddon.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.rpa = action.payload;
      })
      .addCase(rpaAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


  },
});

export const {
  setStatus,

  setAddon,
  setCode,
  setVision,
  setRpa,
} = addonSlice.actions;

export default addonSlice.reducer;










