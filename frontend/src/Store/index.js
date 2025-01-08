import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},           // Initialize as an object
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {   // Optionally accept payload for future use
      state.isLoggedIn = true;
      state.user = action.payload;  // Store user data in state (optional)
    },
    logout(state) {          
      state.isLoggedIn = false;
      state.user = {};       // Clear user data
    },
  },
});

// ** Fix the typo here **
export const authActions = authSlice.actions;

// Configure the store
export const store = configureStore({
  reducer: authSlice.reducer,
});