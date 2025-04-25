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

      // TASK1: add a check -> paste already exists wala case

      state.pastes.push(paste);

      // (Pushing the data to localstorage)
      localStorage.setItem('pastes', JSON.stringify(state.pastes));

      // (Toast notification)
      toast.success('Paste created successfully!!!', {
        duration: 3000,
      });
    },

    /*  LOGIC:
    1. (Receive the updated paste object from the action (i.e., action.payload)): const updatedPaste = action.payload
    2. (Find the index of the paste you want to update in the state.pastes array) :
    const index = state.pastes.findIndex(p => p._id === updatedPaste._id);
    3.Check if the paste was found (i.e., index is not -1).
    4. (If found, replace the paste at that index with the updated one)
    :   if (index !== -1) {
        state.pastes[index] = updatedPaste;
        }
    5. (localStorage.setItem('pastes', JSON.stringify(state.pastes)))
    :  localStorage.setItem('pastes', JSON.stringify(state.pastes));
    6. ((Optional) Show a success message)  : toast.success('Paste updated successfully!');
     */
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      // LOGIC:
      // 1. Find the index of the paste we want to update
      /*   # "individualArrayItem" ma chai harek iteration ma one { } value hold hunxa, until every value inside the array
      #     */

      const index = state.pastes.findIndex((individualArrayItem) => {
        return individualArrayItem._id === updatedPaste._id;
      });

      // 2. If index of the paste is found then, replacing the old ata with the new one in the selected Index
      if (index >= 0) {
        state.pastes[index] = updatedPaste;
      }

      // 3. Saving the data to localstorage
      localStorage.setItem('pastes', JSON.stringify(state.pastes));

      toast.success('Paste updated!!!', 3000);
    },

    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
    },

    /* LOGIC:
    1. (What do I need to remove?): a single paste, based in _id
    2. (Where is this paste stored?): inside the state.pastes array
    3. (How do I remove it?): Use filter() to create a new array excluding the paste that matches the given _id.
    */
    //  Yo reducer funtion le chai id  dispatch bata get garxa
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

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
