// userActions.js
import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  initialComponent
} from '../slices/addonSlice'

// Acción asincrónica
export const fetchsAddon =
  createAsyncThunk('addon/fetchsAddon',
    async (addonId, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.get(
          '/addon',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('resp', resp)

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );


export const fetchAddon =
  createAsyncThunk('addon/fetchAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );

export const addAddon =
  createAsyncThunk('addon/addAddon',
    async (addon, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon',
          { addon },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('resp', resp)
        return 'eee';
      } catch (error) {
        throw error;
      }
    }
  );

export const updateAddon =
  createAsyncThunk('addon/updateAddon',
    async (addon, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.put(
          '/addon',
          { addon },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );


        console.log('resp', resp)
        return 'user';
      } catch (error) {
        throw error;
      }
    }
  );


  export const deleteAddon =
  createAsyncThunk('addon/deleteAddon',
    async (addonId, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.delete(
          `/addon`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: { id: addonId },  // Datos que se enviarán en el cuerpo
        });

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );









// --------------------------------------------------------

export const visionAddon =
  createAsyncThunk('addon/visionAddon',
    async (addon, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon/vision',
          { addon },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );


        console.log('resp', resp)

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );



export const codeAddon =
  createAsyncThunk('addon/codeAddon',
    async (code, { dispatch }) => {
      try {
        console.log('edwed')
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon/code',
          { code },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );


        console.log('resp', resp)
        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );



export const rpaAddon =
  createAsyncThunk('addon/rpaAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('edwed')
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon/rpa',
          { addon },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );


        console.log('resp', resp)

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );




