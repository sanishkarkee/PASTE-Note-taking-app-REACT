// Used to view single item(paste)

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  // all pastes haru madhya specific paste select garne mathi search param bata   aayeko id ko paste nikalne (filter(): choose first array OR use find() )

  // const selectedPaste = allPastes.filter((allPasteObjectData) => {
  //   return allPasteObjectData?._id === id;
  // })[0];

  // OR

  const selectedPaste = allPastes.find((allPasteObjectData) => {
    return allPasteObjectData?._id === id;
  });

  console.log('Final Paste', selectedPaste);

  return (
    <>
      <div>
        <div className='flex items-center gap-4'>
          <input
            className=' w-[80%] p-3 rounded-lg text-white'
            type='text'
            placeholder='Enter title here'
            value={selectedPaste.title}
            disabled
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        {/* For TEXTAREA */}
        <div className='mt-2'>
          <textarea
            className='rounded-lg  p-3 size-full h-48 text-white'
            placeholder='Paste your notes here'
            value={selectedPaste.content}
            disabled
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ViewPaste;
