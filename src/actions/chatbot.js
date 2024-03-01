// userActions.js
import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit';


import {
  setChatbot
} from '@/slices/chatbotSlice'

// Acción asincrónica
export const addChatbot =
  createAsyncThunk('chatbot/addChatbot',
    async (data, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        console.log('dd', data)
        const resp = await apiBackend.post(
          '/chatbot', {
          chatbot: data
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        );

        console.log('resp', resp)

        return resp.data[0];
      } catch (error) {
        throw error;
      }
    }
  );


  

  export const fetchsChatbot = 
  createAsyncThunk('vector/fetchsVector',
  async ({id, name, title = false}) => {
    try {
      const token = localStorage.getItem('token')
  
       const res = await apiBackend.get(
        `/chatbot`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      )
  
      console.log('ress', res)
      
  
      return res.data
    } catch (error) {
      console.error('Error:', error)
    }
  })



  export const fetchChatbot = 
  createAsyncThunk('chatbot/fetchChatbot',
  async (id, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
  
      console.log('tooeoeo', token)
       const res = await apiBackend.get(
        `/chatbot/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      )

      console.log('fetchchtba', res)
  
      dispatch(setChatbot(id))

      return res.data
    } catch (error) {
      console.error('Error:', error)
    }
  })
  



  export const deleteChatbot = 
  createAsyncThunk('chatbot/deleteChatbot',
  async ( {id}, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
  
      const res = await apiBackend.delete(
        `/chatbot`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        data: {
          id
        },
      })

      console.log('delete res', res)

      return res.data
    } catch (error) {
      console.error('Error:', error)
    }
  })





  
    
 
// // Acción asincrónica
// export const addMessage =
// createAsyncThunk('chatbot/addMessage',
//   async (item, { dispatch }) => {
//     try {

//       return item;
//     } catch (error) {
//       throw error;
//     }
//   }
// );




