import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { instance } from "../../utils/api.js";

export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await instance.post(
        "/api/categories/create",
        payload,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetCreateCategoryAction = createAction("category/create/reset");

export const categoryListAction = createAsyncThunk(
  "category/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await instance.get("/api/categories/list");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryDeleteAction = createAsyncThunk(
  "category/delete",
  async (slug, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await instance.delete(`/api/categories/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetCategoryDeleteAction = createAction('category/delete/reset');

const initialState = {
  list:[]
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.isSuccess = false;
      })
      .addCase(createCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
      })
      .addCase(createCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message
          ? action.payload.message
          : action.payload;
      })
      .addCase(resetCreateCategoryAction, (state, action) => {
        state.loading = undefined;
        state.error = undefined;
        state.isSuccess = undefined;
      });
    builder
      .addCase(categoryListAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(categoryListAction.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(categoryListAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message
          ? action.payload.message
          : action.payload;
      });
    builder
      .addCase(categoryDeleteAction.pending, (state, action) => {
        state.deleteLoading = true;
        state.deleteError = false;
      })
      .addCase(categoryDeleteAction.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = action.payload;
      })
      .addCase(categoryDeleteAction.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload?.message
          ? action.payload.message
          : action.payload;
      })
      .addCase(resetCategoryDeleteAction, (state, action)=>{
        state.deleteLoading=undefined;
        state.deleteError=undefined;
        state.deleteSuccess=undefined;
      });
  },
});
