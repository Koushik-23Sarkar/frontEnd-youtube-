import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log(credentials);
      const response = await axiosClient.post("/api/v1/users/login", credentials,{withCredentials:true});
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
    // const response = await fetch("http:///localhost:8000/api/v1/users/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({
    //     username: "koushik",
    //     email: "kous345345354hik@gmail.com",
    //     password: '"232323"',
    //   }),
    // });

    // const data = await response.json();
    // console.log(data);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("state");
        console.log(state);
        console.log("action");
        console.log(action);
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload.data.user;

        console.log("state.isAuthenticated");
        console.log(state.isAuthenticated)
        console.log("state.user");
        console.log(state.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("state");
        console.log(state);
        console.log("action");
        console.log(action);
      });
  },
});

export default authSlice.reducer;
