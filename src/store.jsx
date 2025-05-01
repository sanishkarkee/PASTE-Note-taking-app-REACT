import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './redux/pasteSlice';

// "__REDUX_DEVTOOLS_EXTENSION__()": yo add gare paxi cahi chrome ma redxu tools le kaam garxa
export const store = configureStore(
  {
    reducer: {
      paste: pasteReducer,
    },
  },
  __REDUX_DEVTOOLS_EXTENSION__()
);
