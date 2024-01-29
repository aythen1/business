// userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  initialComponent
} from '../slices/addonSlice'

// Acción asincrónica
export const fetchsAddon =
  createAsyncThunk('addon/fetchsAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
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
    async (addonId, { dispatch }) => {
      try {
        const component = {
          ...initialComponent,
          createdAt: new Date().toISOString(),
        };
        return component;
      } catch (error) {
        throw error;
      }
    }
  );

export const updateAddon =
  createAsyncThunk('addon/updateAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );



// --------------------------------------------------------

export const visionAddon =
  createAsyncThunk('addon/visionAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('edwed')

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );



export const codeAddon =
  createAsyncThunk('addon/codeAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('edwed')

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );


  
  
  
  // -------------------------------------------------------------------






  export const ayAddon =
  createAsyncThunk('addon/ayAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('edwed')

        return 'edew';
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

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );





  export const dataAddon =
  createAsyncThunk('addon/dataAddon',
    async (addonId, { dispatch }) => {
      try {
        console.log('data')

        return 'edew';
      } catch (error) {
        throw error;
      }
    }
  );




