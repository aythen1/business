// userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  initialComponent
} from '../slices/pivotSlice'

// Acción asincrónica
export const fetchsPivot =
  createAsyncThunk('pivot/fetchsPivot',
    async (pivotId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );


export const fetchPivot =
  createAsyncThunk('pivot/fetchPivot',
    async (pivotId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );

export const addPivot =
  createAsyncThunk('pivot/addPivot',
    async (pivtoId, { dispatch }) => {
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

export const updatePivot =
  createAsyncThunk('pivot/updatePivot',
    async (pivotId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );

export const deletePivot =
  createAsyncThunk('pivot/deletePivot',
    async (pivotId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );