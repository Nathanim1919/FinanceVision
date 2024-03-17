import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/Api.jsx";
import { GOOGLE_API_KEY } from "../../utils/Api.jsx";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const initialState = {
    messages: [],
    isLoading:false,
    conversations: [],
    activeConversation: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
        }
    },

    extraReducers:(builder)=> {
        builder.addCase(createMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
        });
        builder.addCase(aiMessage.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(aiMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
            state.isLoading = false;
        });
        builder.addCase(fetchChat.fulfilled, (state, action) => {
            state.messages = (action.payload);
        });
    },
});


export const fetchChat = createAsyncThunk(
    'chat/fetchMessage',
    async ({chatId}) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/chat`, { params: { chatId } });
            return response.data.data.messages;
        } catch (error) {
            console.log(error)
        }
    }
)

export const createMessage = createAsyncThunk(
    'chat/createMessage',
    async ({message, chatBoard}) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/chat/createMessage`, {content:message,chatId:chatBoard});
            console.log(message)
            return response.data;
        } catch (error) {
           console.log(error)
        }
    }
);


export const aiMessage = createAsyncThunk(
    'chat/aiMessage',
    async ({message, chatBoard}) => {
        const generationConfig = {
            stopSequences: ["red"],
            maxOutputTokens: 100,
            temperature: 0.9,
            topP: 0.1,
            topK: 16,
          };
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
           // Use streaming with text-only input
            const result = await model.generateContentStream(message);
            const response = await result.response;
            const text = response.text();
            console.log(text);
            // Save the AI message to the database
            const saveResponse = await axios.post(`${BASE_URL}/api/v1/chat/saveAiMessage`, { content: text, chatId:chatBoard});
            return saveResponse.data;
    } catch (error) {
      throw new Error('Error getting response from AI');
    }
    }
)


export default chatSlice.reducer;