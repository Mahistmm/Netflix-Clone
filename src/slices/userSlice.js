import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

export const handleLogin = (token) => {
  return async (dispatch) => {
    const res = await axios.get(`/auth/verify/${token}`);
    console.log(res);
    dispatch(setUser(res.data));
  };
};
