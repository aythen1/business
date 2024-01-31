// userActions.js
import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  initialComponent
} from '../slices/dashboardSlice'

// Acción asincrónica
export const fetchsDashboard =
  createAsyncThunk('dashboard/fetchsDashboard',
    async ({}, { dispatch }) => {
      try {
        const res = await apiBackend.get(
          `/dashboard`, 
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // Puedes agregar otros parámetros de la solicitud GET aquí si es necesario
        });
    
        console.log('res', res)
    
        return res.data
      } catch (error) {
        console.log('err', error)
        if(error.response.status == 400){
          throw 'Ya existe el usuario'
        }
      }
    }
  );


export const fetchDashboard =
  createAsyncThunk('dashboard/fetchDashboard',
    async (dashboardId, { dispatch }) => {
      try {
        const res = await apiBackend.get(
          `/dashboard/${dashboardId}`, 
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // Puedes agregar otros parámetros de la solicitud GET aquí si es necesario
        });
    
        console.log('res', res)
    
        return res.data
      } catch (error) {
        console.log('err', error)
        if(error.response.status == 400){
          throw 'Ya existe el usuario'
        }
      }
    }
  );

export const addDashboard =
  createAsyncThunk('dashboard/addDashboard',
    async (dashboard, { dispatch }) => {
      try {
        console.log( 'dashboard', dashboard)

        const token = localStorage.getItem('token')

        const res = await apiBackend.post('/dashboard', {
          token,
          dashboard
        })

        console.log('add dashboard', res)

        return res;
      } catch (error) {
        throw error;
      }
    }
  );

export const updateDashboard =
  createAsyncThunk('dashboard/updateDashboard',
    async (dashboardId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );

export const deleteDashboard =
  createAsyncThunk('dashboard/deleteDashboard',
    async (dashboardId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );