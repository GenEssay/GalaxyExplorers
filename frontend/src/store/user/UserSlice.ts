import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    name: string;
    email: string;
  } | null;
}

const initialState: UserInfo = {
  isLoggedIn: false,
  token: null,
  user: null,
};

export type LoginRegisterResponse = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

export type LoginRegisterResponseError = {
  name: string;
  message: string;
  trace?: string;
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginRegisterResponse>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
