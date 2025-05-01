import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

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

      // TASK1: add a check -> paste already exists wala case

      state.pastes.push(paste);

      // (Pushing the data to localstorage)
      localStorage.setItem('pastes', JSON.stringify(state.pastes));

      // (Toast notification)
      toast.success('Paste created successfully!!!', {
        duration: 3000,
      });
    },

    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;

      const index = state.pastes.findIndex((individualArrayItem) => {
        return individualArrayItem._id === updatedPaste._id;
      });

      if (index >= 0) {
        state.pastes[index] = updatedPaste;
      }

      localStorage.setItem('pastes', JSON.stringify(state.pastes));

      toast.success('Paste updated!!!', 3000);
    },

    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
    },

    removeFromPastes: (state, action) => {
      const idToRemove = action.payload;
      console.log('Deleting ID:', action.payload);

      // id namilne array matra rakhera naya array banauxa
      const newUpdatedArray = state.pastes.filter((individualArrayData) => {
        return individualArrayData._id !== idToRemove;
      });

      state.pastes = newUpdatedArray;
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
      toast.success('Paste Deleted', 3000);
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
