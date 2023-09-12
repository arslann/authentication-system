import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000'; // Replace with your actual API URL

// Async thunk action to handle login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/users`, credentials);

      // Assuming your backend returns a user and token upon successful login
      const { user, token } = response.data;

      return { user, token };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// Define the initial state
const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken'); // deletes token from storage
      state.user = null;
      state.token = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log(state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(state.error);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
