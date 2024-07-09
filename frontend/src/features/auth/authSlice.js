import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "./authService";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducer: {},
});

export default authSlice.reducer;
