import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Used to store all our data OR CENTRALIZED STORE
//Consfuse bhayo bhane initialState keyword lai "state" le replace gardine,,state.pastes = [{state.pastes.push(paste)},{..},{..},{..},{..},{..}]
const initialState = {
  pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes'))
    : [],
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      //<Home.jsx> bata send gareko paste object yaha receive gareko. Exact data nai receive hunxa (object send xa so same object nai receive hunxa )
      const paste = action.payload;
      state.pastes.push(paste);

      // Pushing the data to localstorage
      localStorage.setItem('pastes', state.pastes);

      // Toast notification
      toast.success('Paste created successfully!!!');
    },

    updateToPastes: (state, action) => {},

    resetAllPastes: (state, action) => {},

    removeFromPastes: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
