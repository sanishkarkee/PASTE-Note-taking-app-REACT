//Used to list all the items(pastes)

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
  /*
  # state→  refers to the whole Redux state
  # state.paste→  refers to the paste slice you named in store.js
  # state.paste.pastes→ is the actual array you're working with in your app
  # Redux doesn’t "guess" which file to use. YOU told Redux what goes where:
    - In store.js, you connected pasteReducer to the key 'paste'.
    - That’s why 'state.paste' maps directly to the data in pasteSlice.js.
  */

  const [searchTerm, setSearchTerm] = useState('');

  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const dispatch = useDispatch();

  // Filter/Search functionality
  // const filteredData = pastes.filter((individualArrayData) =>
  //   individualArrayData.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // OR

  // Filter/Search functionality
  const filteredData = pastes.filter((individualArrayData) => {
    return individualArrayData.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div>
      <input
        className='p-3 w-full rounded-lg mb-3'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-4'>
        {filteredData.length > 0 &&
          filteredData.map((allFilteredData, allFilteredDataIndex) => {
            //Making Date format more beautiful
            const formattedDate = new Date(
              allFilteredData.createdAt
            ).toLocaleDateString('en-US', {
              // weekday: 'long', // "Monday"
              year: 'numeric', // "2025"
              month: 'long', // "April"
              day: 'numeric', // "23"
            });

            return (
              <div
                className='border border-pink-300 p-2 rounded-lg'
                key={allFilteredDataIndex}
              >
                <div>{allFilteredData.title}</div>
                <div>{allFilteredData.content}</div>
                <div className='flex justify-evenly'>
                  {/* EDIT: edit garda chai home page khulnu parxa so '/' */}
                  <button>
                    <NavLink
                      to={`/?pasteId=${allFilteredData?._id}`}
                      className='text-white'
                    >
                      Edit
                    </NavLink>
                  </button>

                  {/* VIEW: yo garda chai 'ViewPaste' khulnu parxa */}
                  <button>
                    <NavLink
                      className='text-white'
                      to={`/pastes/${allFilteredData?._id}`}
                    >
                      View
                    </NavLink>
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => {
                      handleDelete(allFilteredData?._id);
                    }}
                  >
                    Delete
                  </button>

                  {/* COPY: navigator.clipboard.writeText(text to copy) */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(allFilteredData?.content);
                      toast.success('Copied to clipboard');
                    }}
                  >
                    Copy
                  </button>

                  {/* SHARE: (tutor gave this as homework) */}
                  <button>share</button>
                </div>

                {/* Formatted Date */}
                <div>{formattedDate}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
