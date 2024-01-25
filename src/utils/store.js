// store.js
import { configureStore } from '@reduxjs/toolkit';

import dashbordReducer from '@/slices/dashboardSlice';
import componentReducer from '@/slices/componentSlice';
import assetsReducer from '@/slices/assetsSlice';
import iamReducer from '@/slices/iamSlice';

const store = configureStore({
  reducer: {
    dashboard: dashbordReducer,
    assets: assetsReducer,
    component: componentReducer,
    iam: iamReducer,
  },
});

export default store;