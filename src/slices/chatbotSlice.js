// userSlice.js
import { createSlice } from '@reduxjs/toolkit';


/*
Es el slice que va a pasar datos del vector al addon con NLP
para ello como los dos son vectores vamos a calcular su distancia 
para que todas las preguntas sean en lenguaje natural,
además queda integrado con funciones extras para mejorar
la experiencia del ususario.
*/
import {
    // addMessage,
    fetchsChatbot,
    fetchChatbot,
    
    addChatbot,
    deleteChatbot,
} from '@/actions/chatbot'



const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState: {
    chatbot: null,
    message: null,

    chatbots: [],
  },
  reducers: {
    setChatbot: (state, action) => {
      console.log('eee',action.payload)
      const chatbotIndex = state.chatbots.findIndex(chatbot => chatbot.id === action.payload);
      if (chatbotIndex !== -1) {
         state.chatbot = state.chatbots[chatbotIndex];
      }
    },
  },
  extraReducers: (builder) => {
    // Manejar las acciones generadas por createAsyncThunk
    builder

      // .addCase(addMessage.fulfilled, (state, action) => {
      //   console.log('state,acrio-', action.payload)
      //   state.message = action.payload;
      // })
      .addCase(addChatbot.fulfilled, (state, action) => {
        state.chatbot = action.payload;
        state.chatbots.push(action.payload)
      })
      .addCase(fetchsChatbot.fulfilled, (state, action) => {
        state.chatbots = action.payload;

        if(action.payload.length > 0){
          state.chatbot = action.payload[0]
        }
      })
      .addCase(fetchChatbot.fulfilled, (state, action) => {
        console.log('eeee',)
      })
      .addCase(deleteChatbot.fulfilled, (state, action) => {
        console.log('eeee delete', action.payload)

        state.chatbots = state.chatbots.filter(chatbot => chatbot.id !== action.payload);
        // state.message = []

        if(action.payload.length > 0){
          state.chatbot = action.payload[0]
        }
      })
  },
});

export const {
    setChatbot
} = chatbotSlice.actions;

export default chatbotSlice.reducer;












