// store.js
import { configureStore } from '@reduxjs/toolkit';

import dashboardReducer from '@/slices/dashboardSlice';
import addonReducer from '@/slices/addonSlice';
import iamReducer from '@/slices/iamSlice';
import assetsReducer from '@/slices/assetsSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    assets: assetsReducer,
    addon: addonReducer,
    iam: iamReducer,
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