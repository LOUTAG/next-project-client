/*** modules ***/
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

/*** files ***/
import setupInterceptors from "../../utils/api.js";

export const registerAction = createAsyncThunk(
  "register/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.post("/api/users/register", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetRegisterAction = createAction("register/reset");

export const accountVerificationAction = createAsyncThunk(
  "account/validation",
  async (token, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.get(
        `/api/users/account-validation/${token}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetAccountVerificationAction = createAction("account/reset");

export const loginAction = createAsyncThunk(
  "user/login",
  async(user, { rejectWithValue, getState, dispatch }) =>{
    try{
      const response = await axios.post('/api/users/login', user);
      setupInterceptors(response.data, dispatch);
      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }
)
export const resetLoginAction = createAction("user/login/reset");
export const logoutAction = createAction("user/logout");

export const refreshAccessTokenAction = createAction("user/refresh-access-token");

export const forgotPasswordAction = createAsyncThunk(
  "user/forgotpassword",
  async(email, { rejectWithValue, getState, dispatch })=>{
    try{
      const response = await axios.post('/api/users/forgot-password', email);
      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetForgotPasswordAction = createAction("user/forgotpassword/reset");

export const resetPasswordAction = createAsyncThunk(
  "user/resetpassword",
  async(payload, { rejectWithValue, getState, dispatch })=>{
    try{
      const response = await axios.put('/api/users/reset-password', payload);
      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetResetPasswordAction = createAction("user/resetpassword/reset");


const initialState = {
  userAuth:
    typeof window !== "undefined" && localStorage.getItem("userAuth")
      ? JSON.parse(localStorage.getItem("userAuth"))
      : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.isCreated = false;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = true;
      })
      .addCase(resetRegisterAction, (state, action) => {
        state.isCreated = undefined;
        state.error = false;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(accountVerificationAction.pending, (state, action)=>{
        state.loading = true;
        state.error = false;
        state.isValidated = false;
      })
      .addCase(accountVerificationAction.fulfilled, (state, action)=>{
        state.loading= false;
        state.isValidated = true;
      })
      .addCase(resetAccountVerificationAction, (state, action)=>{
        state.isValidated = undefined;
        state.error = false;
      })
      .addCase(accountVerificationAction.rejected, (state, action)=>{
        state.loading= false;
        state.error = action.payload.message ? action.payload.message : action.payload;
      });
      builder
      .addCase(loginAction.pending, (state, action)=>{
        state.loading = true;
        state.error=false;
        state.userAuth=null;
      })
      .addCase(loginAction.fulfilled, (state, action)=>{
        state.loading=false;
        state.isAuth=true;
        state.userAuth = action.payload;
        localStorage.setItem('userAuth', JSON.stringify(state.userAuth));
      })
      .addCase(resetLoginAction, (state, action)=>{
        state.error=false;
        state.isAuth=undefined;
      })
      .addCase(logoutAction, (state, action)=>{
        state.userAuth=null;
        localStorage.removeItem('userAuth');
        setupInterceptors(null, null);
      })
      .addCase(loginAction.rejected, (state, action)=>{
        state.loading=false;
        state.error= action.payload.message ? action.payload.message : action.payload;
      });
      builder
      .addCase(refreshAccessTokenAction, (state, action)=>{
        state.userAuth={...state.userAuth, accessToken: action.payload};
        localStorage.setItem('userAuth', JSON.stringify(state.userAuth));
      });
      builder
      .addCase(forgotPasswordAction.pending, (state, action)=>{
        state.loading=true;
        state.error=false;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action)=>{
        state.loading=false;
        state.isSuccess=true;
      })
      .addCase(forgotPasswordAction.rejected, (state, action)=>{
        state.loading= false;
        state.error = action.payload.message;
      })
      .addCase(resetForgotPasswordAction, (state, action)=>{
        state.isSuccess=undefined;
        state.loading=undefined;
        state.error=undefined;
      });
      builder
      .addCase(resetPasswordAction.pending, (state, action)=>{
        state.loading=true;
        state.error=false;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action)=>{
        state.loading=false;
        state.isSuccess=true;
      })
      .addCase(resetPasswordAction.rejected, (state, action)=>{
        state.loading= false;
        state.error = action.payload.message;
      })
      .addCase(resetResetPasswordAction, (state, action)=>{
        state.isSuccess=undefined;
        state.loading=undefined;
        state.error=undefined;
      });
  },
});
