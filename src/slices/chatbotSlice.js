import { createSlice } from '@reduxjs/toolkit';



import {
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
      const chatbotIndex = state.chatbots.findIndex(chatbot => chatbot.id === action.payload);
      if (chatbotIndex !== -1) {
         state.chatbot = state.chatbots[chatbotIndex];
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.chatbots = state.chatbots.filter(chatbot => chatbot.id !== action.payload);

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












