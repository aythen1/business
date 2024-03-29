import { createSlice } from "@reduxjs/toolkit";

import {
  setOpenMenuLeft,
  setOpenMenuRight,
  setOpenChatBot,
  setOpenModal,
  fetchsDefault,
  updateDefault,
  fetchsBillingExpenses,
  fetchsBilling,
  updateBilling,
  fetchsInvoice,
  addInvoice,
  fetchUser,
  fetchUser2,
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
  deleteLogs,
  fetchsLog
} from '@/actions/iam'



const iamSlice = createSlice({
  name: "iam",
  initialState: {
    themeColor: "#fff",

    user: null,
    users: [],
    billing: null,
    expenses: null,
    token: null,

    vector: {},
    vectors: [],

    // default
    addons: [],
    gpts: [],
    changelogs: [],
    news: [],

    status: 'idle',
    status: "idle", // Puede ser 'idle', 'pending', 'fulfilled', 'rejected'
    error: null,

    modal: null,
    openModal: false,
    openNotification: false,
    openMenuLeft: false,
    openMenuRight: false,
    openChatBot: false,

    invoices: [],

    users: [],
    applications: [],
    polices: [],
    apis: [],
    logs: [],
  },
  reducers: {
    setUser: (state, action) => {
      // lógica para manejar la acción 'setUser'
    },
    setModal: (state, action) => {
      if (action.payload) {
        state.openModal = true;
        state.modal = action.payload;
      } else {
        state.openModal = false;
      }
    },
    setNotification: (state, action) => {
      console.log('settntvit', action.payload)
      if (action.payload) {
        state.openNotification = true;
        // state.notification = action.payload;
      } else {
        state.openNotification = false;
      }
    },
    setVector: (state, action) => {
      state.vector = action.payload;
    },
    setVectors: (state, action) => {
      state.vectors = action.payload;
    },

    // otras acciones...
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setOpenMenuLeft.fulfilled, (state, action) => {
        state.openMenuLeft = action.payload;
      })
      .addCase(setOpenMenuRight.fulfilled, (state, action) => {
        state.openMenuRight = action.payload;
      })
      .addCase(setOpenChatBot.fulfilled, (state, action) => {
        state.openChatBot = action.payload;
      })
      .addCase(setOpenModal.fulfilled, (state, action) => {
        console.log("einderunfur");
        if (action.payload) {
          state.openModal = true;
          state.modal = action.payload;
        } else {
          state.openModal = false;
        }
      })

      .addCase(fetchsDefault.fulfilled, (state, action) => {
        state.addons = action.payload.addons;
        state.gpts = action.payload.gpts;
        state.changelogs = action.payload.changelogs;
        state.news = action.payload.news;
      })

      .addCase(updateDefault.fulfilled, (state, action) => {
        console.log("dddd", action.payload);
        const { table, data } = action.payload;
        const arrayIndex = state[table].findIndex((item) => item.id === data.id);

        // Si encontramos el índice, realizar la actualización
        if (arrayIndex !== -1) {
          state[table][arrayIndex] = data;
        }
      })

      .addCase(fetchsBillingExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload
      })

      .addCase(fetchsBilling.fulfilled, (state, action) => {
        state.billing = action.payload
        // state.billing = action.payload
        console.log("fetchsBillingfetchsBilling,", action.payload);
        if(action.payload.billings){
          state.billing = action.payload.billings;
        }
      })
      .addCase(updateBilling.fulfilled, (state, action) => {
        state.billing = action.payload;
      })

      .addCase(fetchsInvoice.fulfilled, (state, action) => {
        state.invoices = action.payload
        // state.billing = action.payload
        state.invoices = action.payload;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.push(action.payload)
        // state.billing = action.payload
        state.invoices = state.invoices.push(action.payload);
      })

      .addCase(fetchUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      .addCase(fetchUser2.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUser2.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(fetchUser2.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.error = 'Email enviado de confirmación';
        console.log("token", action.payload);
        // localStorage.setItem('token', action.payload)
        // state.token = action.payload;
        state.error = "Email enviado de confirmación";
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(upgrade.fulfilled, (state, action) => {
        // localStorage.setItem('token', action.payload)
        // state.token = action.payload.token;
        // state.user = action.payload.user;
      })
      .addCase(upgrade.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(upgrade.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        // state.user = action.payload;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(confirm.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(confirm.rejected, (state, action) => {
        if (action.error.message == 501) {
          state.token = null;
          state.user = null;
        }
        state.error = action.error.message;
      })
      .addCase(verify.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verify.rejected, (state, action) => {
        if (
          action.error.message &&
          action.error.message >= 500 &&
          action.error.message < 600
        ) {
          state.token = null;
          state.user = null;
        }
        state.error = action.error.message;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.error = action.payload;
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePasswordUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(updatePasswordUser.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.users = action.payload.concat(
          state.users.filter(
            (user2) => !action.payload.find((user1) => user1.id === user2.id)
          )
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const indexToDelete = state.users.findIndex(
          (user) => user.id === action.payload
        );
        if (indexToDelete !== -1) {
          state.users = [
            ...state.users.slice(0, indexToDelete),
            ...state.users.slice(indexToDelete + 1),
          ];
        }
      })
      .addCase(fetchsUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(addApplication.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        state.applications = action.payload.concat(
          state.applications.filter(
            (app2) => !action.payload.find((app1) => app1.id === app2.id)
          )
        );
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        const indexToDelete = state.applications.findIndex(
          (application) => application.id === action.payload
        );
        if (indexToDelete !== -1) {
          state.applications = [
            ...state.applictions.slice(0, indexToDelete),
            ...state.applications.slice(indexToDelete + 1),
          ];
        }
      })
      .addCase(fetchsApplication.fulfilled, (state, action) => {
        state.applications = action.payload;
      })

      .addCase(addPolice.fulfilled, (state, action) => {
        state.polices = action.payload.concat(
          state.polices.filter(
            (police2) =>
              !action.payload.find((police1) => police1.id === police2.id)
          )
        );
      })
      .addCase(deletePolice.fulfilled, (state, action) => {
        const indexToDelete = state.polices.findIndex(
          (police) => police.id === action.payload
        );
        if (indexToDelete !== -1) {
          state.polices = [
            ...state.polices.slice(0, indexToDelete),
            ...state.polices.slice(indexToDelete + 1),
          ];
        }
      })
      .addCase(fetchsPolice.fulfilled, (state, action) => {
        state.polices = action.payload;
      })

      .addCase(addApi.fulfilled, (state, action) => {
        state.apis = action.payload.concat(
          state.apis.filter(
            (api2) => !action.payload.find((api1) => api1.id === api2.id)
          )
        );
      })
      .addCase(deleteApi.fulfilled, (state, action) => {
        const indexToDelete = state.apis.findIndex(
          (api) => api.id === action.payload
        );
        if (indexToDelete !== -1) {
          state.apis = [
            ...state.apis.slice(0, indexToDelete),
            ...state.apis.slice(indexToDelete + 1),
          ];
        }
      })
      .addCase(fetchsApi.fulfilled, (state, action) => {
        state.apis = action.payload;
      })

      .addCase(addLog.fulfilled, (state, action) => {
        state.logs.push(action.payload);
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        const indexToDelete = state.logs.findIndex(
          (log) => log.id === action.payload
        );
        if (indexToDelete !== -1) {
          state.logs = [
            ...state.logs.slice(0, indexToDelete),
            ...state.logs.slice(indexToDelete + 1),
          ];
        }
      })
      .addCase(deleteLogs.fulfilled, (state, action) => {
        state.logs = [];
      })
      .addCase(fetchsLog.fulfilled, (state, action) => {
        state.logs = action.payload;
      });
  },
});

export const {
  setUser,
  setModal,
  setNotification,
  setVector,
  setVectors,
  setThemeColor
} = iamSlice.actions;

export default iamSlice.reducer;
