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

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );


export const fetchAddon =
  createAsyncThunk('addon/fetchAddon',
    async (id, { dispatch }) => {
      try {
        console.log('id', id)
        const token = localStorage.getItem('token')
        const resp = await apiBackend.get(
          `/addon/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        // console.log('resp', resp)

        return resp.data;
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

        console.log('respeeeee', resp)
        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );







// Codificar el objeto a Base64
const encodeVector = (obj) => {
  const encodedString = Object.entries(obj)
    .map(([key, value]) => value)
    .join('/');

  return btoa(encodedString);
};

//
export const iniVector = (obj) => {
  return encodeVector(obj)
}



export const fetchsVectorAddon =
  createAsyncThunk('vector/fetchsVector',
    async ({ id, name }) => {
      try {
        const token = localStorage.getItem('token')

        const res = await apiBackend.post(
          `/addon/${id}/${name}`, {

        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        )

        return res.data
      } catch (error) {
        console.error('Error:', error)
      }
    })




export const addVectorAddon =
  createAsyncThunk('addon/addVectorAddon',
    async ({ addon, vector }, { dispatch }) => {
      try {
        // console.log('eeee', addon, vector)
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon/vector',
          {
            addon,
            vector
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        );

        console.log('rrr', resp)

        return 'hello'
        // return resp.data[0];
      } catch (error) {
        console.log('errr', error)
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

        // console.log('resp', resp)

        return resp.data;
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

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );



export const codeAddon =
  createAsyncThunk('addon/codeAddon',
    async ({ components }, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const tokenGPT = localStorage.getItem('token-gpt')

        const arrComponents = components.map(component => component.text);

        const resp = await apiBackend.post(
          '/addon/code',
          {
            token: tokenGPT,
            components: arrComponents
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        );


        return {
          components: resp.data,
          code: resp.data.join('\n')
        }
      } catch (error) {
        console.log('error', error)
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

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );




