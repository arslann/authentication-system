import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000';

// Async thunk action to handle login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/users`, credentials);

      const { user, token } = response.data;

      // normally we would store JWT token
      localStorage.setItem('user', JSON.stringify(user));

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
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user'); // deletes user from storage
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
