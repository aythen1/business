// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchsTicket,
  fetchTicket,
  addTicket,
  updateTicket,
  deleteTicket,

  addVectorTicket,
  vectorTicket
} from '@/actions/ticket'

export const initialMessage = {
  id: '',
  message: '',
  updatedAt: '',
  createdAt: ''
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    status: 'pending',
    loading: false,

    tickets: [],
    messages: []
  },
  reducers: {
    setTicket: (state, action) => {
      // lógica para manejar la acción 'setUser'
    },
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder

      .addCase(fetchsTicket.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.tickets = action.payload;
      })
      .addCase(fetchsTicket.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(fetchTicket.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.messages = action.payload;
      })
      .addCase(fetchTicket.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(addTicket.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.tickets.push(action.payload);
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(updateTicket.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.components = action.payload;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload.id);
      })


      .addCase(addVectorTicket.fulfilled, (state, action) => {
        state.messages.push(action.payload)
      })

      .addCase(vectorTicket.fulfilled, (state, action) => {
        console.log('aa', action.payload)
        state.messages = action.payload
      })

  },
});

export const {
  setTicket,
} = ticketSlice.actions;

export default ticketSlice.reducer;
