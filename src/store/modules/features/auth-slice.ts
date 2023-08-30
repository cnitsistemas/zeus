import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};
// Type for our state
type AuthState = {
  auth: any;
};

// Initial state
const initialState = {
  value: {
    auth: null,
  } as AuthState,
} as InitialState;

// Actual Slice
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    logOut: () => {
      return initialState;
    },
    logIn(state, action: PayloadAction<String>) {
      return {
        value: {
          auth: action.payload,
        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
