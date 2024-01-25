// userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';



// Acción asincrónica
export const addDashboard = createAsyncThunk('dashboard/add', async (dashbordId, { dispatch }) => {
  try {
    console.log('create dashboard')
    // Disparar la acción 'fulfilled' con el usuario obtenido
    // dispatch(setUserFulfilled(user));
    return [];
  } catch (error) {
    // Disparar la acción 'rejected' con el error
    dispatch(setUserRejected(error.message));
    throw error;
  }
});



export const loadDashboard = createAsyncThunk('dashboard/load', async (connect, { dispatch }) => {

  const _connect = {
    database: 'helloworld',
    loading: [ 'raws' ],
    option: 'size',
    contentLenght: 'json/type',
    filters: {},
    errors: {},
    connections: {},
    ay: {}
  }
  try {
    console.log('create dashboard')
    // Disparar la acción 'fulfilled' con el usuario obtenido
    // dispatch(setUserFulfilled(user));
    return [];
  } catch (error) {
    // Disparar la acción 'rejected' con el error
    dispatch(setUserRejected(error.message));
    throw error;
  }
});