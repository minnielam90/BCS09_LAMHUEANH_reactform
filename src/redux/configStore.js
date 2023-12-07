import { configureStore } from "@reduxjs/toolkit";
import { QuanLySinhVienReducer } from "./reducers/QuanLySinhVienReducer";

export const store = configureStore({
  reducer: {
    QuanLySinhVienReducer,
  },
});
