import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');

  //   for textarea content
  const [value, setValue] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  return (
    <div className='w-[30rem]'>
      <div
        className='flex items-center gap-4
    '
      >
        <input
          className=' w-[80%] p-3 rounded-lg text-white'
          type='text'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* Button name  routing path anusar set garne for update,edit,delete .*/}
        <button
          className={`w-[20%] p-2 ${pasteId ? 'bg-blue-500' : 'bg-green-500'}`}
        >
          {pasteId ? 'Update' : 'Create'}
        </button>
      </div>

      {/* For TEXTAREA */}
      <div className='mt-2'>
        <textarea
          className='rounded-lg  p-3 size-full h-48 text-white'
          placeholder='Paste your notes here'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
