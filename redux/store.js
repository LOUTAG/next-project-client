import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from "./slices/userSlice";
import { categorySlice } from './slices/categorySlice';

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [categorySlice.name]: categorySlice.reducer
  },
})
 
export default store;