import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchsTicket =
  createAsyncThunk('ticket/fetchsTicket',
    async (ticketId, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.get(
          '/ticket',
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


export const fetchTicket =
  createAsyncThunk('ticket/fetchTicket',
    async (ticketId, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.get(
          `/ticket/${addonId}`,
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

export const addTicket =
  createAsyncThunk('ticket/addTicket',
    async (ticket, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/ticket',
          { ticket },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('respeeeee', resp)
        return 'eee';
      } catch (error) {
        throw error;
      }
    }
  );



export const addVectorTicket =
  createAsyncThunk('ticket/addVectorTicket',
    async ({ ticket, vector }, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/ticket/vector',
          { ticket, vector },
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



  export const vectorTicket =
  createAsyncThunk('ticket/vectorTicket',
    async ({ title, vector }, { dispatch }) => {
      try {
        console.log('tikc', title)
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          `/ticket/vector/${title}`,
          { title, vector },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        return resp.data;
      } catch (error) {
        console.log('err', error)
        throw error;
      }
    }
  );




export const updateTicket =
  createAsyncThunk('ticket/updateTicket',
    async (ticket, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.put(
          '/ticket',
          { ticket },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        return 'user';
      } catch (error) {
        throw error;
      }
    }
  );


  export const deleteTicket =
  createAsyncThunk('ticket/deleteTicket',
    async (ticketId, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.delete(
          `/ticket`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: { id: ticketId }, 
        });

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );







