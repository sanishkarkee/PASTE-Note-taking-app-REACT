import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './redux/pasteSlice';

// "devTools: true": yo add gare paxi cahi chrome ma redxu tools le kaam garxa
export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
  devTools: true, // or false to disable manually
});
