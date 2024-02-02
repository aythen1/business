import { createSlice } from '@reduxjs/toolkit';

import {
  setOpenMenuLeft,
  setOpenMenuRight,
  setOpenChatBot,

  fetchsDefault, 

  fetchsBilling,
  updateBilling,

  fetchsInvoice,
  addInvoice, 

  fetchUser,
  login,
  confirm,
  verify,
  register,
  upgrade,
  updateUser,
  recoverPassword,
  updatePasswordUser,

  addUser,
  deleteUser,
  fetchsUser,

  addApplication,
  deleteApplication,
  fetchsApplication,

  addPolice,
  deletePolice,
  fetchsPolice,

  addApi,
  deleteApi,
  fetchsApi,

  addLog,
  deleteLog,
  fetchsLog
} from '@/actions/iam'
// import { fetchsUser } from '../actions/iam';

const iamSlice = createSlice({
  name: 'iam',
  initialState: {
    user: null,
    billing: null,
    token:  null,
    
    vector: {},
    vectors: [],

    changelogs: [],
    news: [],

    status: 'idle', // Puede ser 'idle', 'pending', 'fulfilled', 'rejected'
    error: null,


    modal: null,
    openModal: false,
    openMenuLeft: false,
    openMenuRight: false,
    openChatBot: false,


    invoices: [],
    
    users: [],
    applications: [],
    polices: [],
    apis: [],
    logs: []
  },
  reducers: {
    setUser: (state, action) => {
      // lógica para manejar la acción 'setUser'
    },
    setModal: (state, action) => {
        if(action.payload){
          state.openModal = true;
          state.modal = action.payload;
        }else{
          state.openModal = false;
        }
    },
    setVector: (state, action) => {
      state.vector = action.payload
    },
    setVectors: (state, action) => {
      state.vectors = action.payload
    }

    // otras acciones...
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder
      .addCase(setOpenMenuLeft.fulfilled, (state, action) => {
        state.openMenuLeft = action.payload
      })
      .addCase(setOpenMenuRight.fulfilled, (state, action) => {
        state.openMenuRight = action.payload
      })
      .addCase(setOpenChatBot.fulfilled, (state, action) => {
        state.openChatBot = action.payload
      })



      .addCase(fetchsDefault.fulfilled, (state, action) => {
        state.changelogs = action.payload.changelogs
        state.news = action.payload.news
      })

      .addCase(fetchsBilling.fulfilled, (state, action) => {
        // state.billing = action.payload
      })
      .addCase(updateBilling.fulfilled, (state, action) => {
        state.billing = action.payload
      })


      .addCase(fetchsInvoice.fulfilled, (state, action) => {
        // state.billing = action.payload
        state.invoices = action.payload
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        // state.billing = action.payload
        state.invoices = state.invoices.push(action.payload)
      })

      

      .addCase(fetchUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })



      .addCase(register.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('token', action.payload)
        // localStorage.setItem('token', action.payload)
        // state.token = action.payload;
        state.error = 'Email enviado de confirmación';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(upgrade.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload)
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(upgrade.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.user = action.payload;
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })


      .addCase(confirm.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(confirm.rejected, (state, action) => {
        if(action.error.message == 501){
          state.token = null
          state.user = null
        }
        state.error = action.error.message;
      })
      .addCase(verify.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verify.rejected, (state, action) => {
        if(action.error.message == 501){
          state.token = null
          state.user = null
        }
        state.error = action.error.message;
      })
      
      .addCase(updateUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      
      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.error = action.payload
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePasswordUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(updatePasswordUser.rejected, (state, action) => {
        state.error = action.error.message;
      })



      .addCase(addUser.fulfilled, (state, action) => {
        console.log('payload', action.payload)
        state.users = { ...state.users, ...action.payload.user};
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const indexToDelete = state.users.findIndex(user => user.id === action.payload);
        if (indexToDelete !== -1) {
          state.users = [...state.users.slice(0, indexToDelete), ...state.users.slice(indexToDelete + 1)];
        }
      })
      .addCase(fetchsUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })


      .addCase(addApplication.fulfilled, (state, action) => {
        console.log('payload', action.payload)
        state.applications = { ...state.applications, ...action.payload};
        // state.applications.push(action.payload;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        const indexToDelete = state.applications.findIndex(application => application.id === action.payload);
        if (indexToDelete !== -1) {
          state.applications = [...state.applictions.slice(0, indexToDelete), ...state.applications.slice(indexToDelete + 1)];
        }
      })
      .addCase(fetchsApplication.fulfilled, (state, action) => {
        state.applications = action.payload;
      })
      
      .addCase(addPolice.fulfilled, (state, action) => {
        state.polices.push(action.payload);
      })
      .addCase(deletePolice.fulfilled, (state, action) => {
        const indexToDelete = state.polices.findIndex(police => police.id === action.payload);
        if (indexToDelete !== -1) {
          state.polices = [...state.polices.slice(0, indexToDelete), ...state.polices.slice(indexToDelete + 1)];
        }
      })
      .addCase(fetchsPolice.fulfilled, (state, action) => {
        state.polices = action.payload;
      })

      .addCase(addApi.fulfilled, (state, action) => {
        state.apis.push(action.payload);
      })
      .addCase(deleteApi.fulfilled, (state, action) => {
        const indexToDelete = state.apis.findIndex(api => api.id === action.payload);
        if (indexToDelete !== -1) {
          state.apis = [...state.apis.slice(0, indexToDelete), ...state.apis.slice(indexToDelete + 1)];
        }
      })
      .addCase(fetchsApi.fulfilled, (state, action) => {
        state.apis = action.payload;
      })

      .addCase(addLog.fulfilled, (state, action) => {
        state.logs.push(action.payload);
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        const indexToDelete = state.logs.findIndex(log => log.id === action.payload);
        if (indexToDelete !== -1) {
          state.logs = [...state.logs.slice(0, indexToDelete), ...state.logs.slice(indexToDelete + 1)];
        }
      })
      .addCase(fetchsLog.fulfilled, (state, action) => {
        state.logs = action.payload;
      })
    },
});

export const { 
  setUser,
  setModal,
  setVector,
  setVectors,
} = iamSlice.actions;


export default iamSlice.reducer;