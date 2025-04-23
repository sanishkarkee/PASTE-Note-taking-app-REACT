//Used to list all the items(pastes)

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Paste = () => {
  /*
  # state→  refers to the whole Redux state
  # state.paste→  refers to the paste slice you named in store.js
  # state.paste.pastes→ is the actual array you're working with in your app
  # Redux doesn’t "guess" which file to use. YOU told Redux what goes where:
    - In store.js, you connected pasteReducer to the key 'paste'.
    - That’s why 'state.paste' maps directly to the data in pasteSlice.js.
  */

  const [searchTerm, setSearchTerm] = useState();
  
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const dispatch = useDispatch();

  return <div>Paste</div>;
};

export default Paste;
