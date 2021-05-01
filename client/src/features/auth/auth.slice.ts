import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserProfile } from "./user-profile";
import { ACCESS_TOKEN_KEY } from "./constants";
import { RootState } from "../../state/store";
import { AuthApi } from "../../api/auth.api";

type AuthSliceState = {
  token: string | null;
  user: UserProfile | null;
};

const initialState: AuthSliceState = {
  token: localStorage.getItem(ACCESS_TOKEN_KEY),
  user: null,
};

export const fetchUserProfile = createAsyncThunk<UserProfile>(
  "auth/fetchUserProfile",
  (arg, thunkAPI) => AuthApi.getUserProfile({ signal: thunkAPI.signal })
);

export const authSlice = createSlice({
  name: "auth",
  reducers: {
    loginWithWithToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { loginWithWithToken, logout } = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state[authSlice.name];

export const selectAuthenticated = createSelector(selectAuthSlice, (res) =>
  Boolean(res.token)
);
