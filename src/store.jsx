import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './redux/pasteSlice';

/*
📦 The store connects DISPATCH and REDUCERS.
✅ It receives actions from dispatch
✅ Forwards them to the correct reducer (like pasteReducer)
✅ Updates and stores the global app state
*/
export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
