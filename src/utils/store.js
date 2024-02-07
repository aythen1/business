// store.js
import { configureStore } from '@reduxjs/toolkit';

import ticketReducer from '@/slices/ticketSlice';
import dashboardReducer from '@/slices/dashboardSlice';
import addonReducer from '@/slices/addonSlice';
import iamReducer from '@/slices/iamSlice';
import assetsReducer from '@/slices/assetsSlice';

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    dashboard: dashboardReducer,
    addon: addonReducer,
    iam: iamReducer,
    assets: assetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'iam/setModal',
        ], // Ignorar la comprobación de serialización para esta acción
      },
    }),
});

export default store;