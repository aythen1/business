// store.js
import { configureStore } from '@reduxjs/toolkit';

import pivotReducer from '@/slices/pivotSlice';
import addonReducer from '@/slices/addonSlice';
import iamReducer from '@/slices/iamSlice';
import assetsReducer from '@/slices/assetsSlice';

const store = configureStore({
  reducer: {
    pivot: pivotReducer,
    assets: assetsReducer,
    addon: addonReducer,
    iam: iamReducer,
  },
});

export default store;