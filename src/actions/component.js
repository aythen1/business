// userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  initialComponent
} from '../slices/componentSlice'

// Acción asincrónica
export const fetchsComponent =
  createAsyncThunk('component/fetchsComponent',
    async (componentId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );


export const fetchComponent =
  createAsyncThunk('component/fetchComponent',
    async (componentId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );

export const addComponent =
  createAsyncThunk('component/addComponent',
    async (componentId, { dispatch }) => {
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

export const updateComponent =
  createAsyncThunk('component/updateComponent',
    async (componentId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );

export const deleteComponent =
  createAsyncThunk('component/deleteComponent',
    async (componentId, { dispatch }) => {
      try {
        console.log('edwed')

        return user;
      } catch (error) {
        throw error;
      }
    }
  );