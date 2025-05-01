import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes } from '../redux/pasteSlice';
import { updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState(' ');

  //   for textarea content
  const [value, setValue] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get('pasteId');
  // console.log(pasteId); //Eg o/p:  1234

  const dispatch = useDispatch();

  // Importing all the pastes data
  const allPastes = useSelector((state) => state.paste.pastes);

  // For the update action
  useEffect(() => {
    console.log('Inside useEffect Hook');
    if (pasteId) {
      const specificPaste = allPastes.find((allArrayPasteData) => {
        return allArrayPasteData?._id === pasteId;
      });
      console.log('Page Found');
      setTitle(specificPaste?.title);
      setValue(specificPaste?.content);
    }
  }, [pasteId]);

  const createPaste = () => {
    // User entered data lai structured way ma store garera REDUCER FUNC/SLICE ma pathauna create gareko ho
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    // Storing data to localstorage
    if (pasteId) {
      //Update
      dispatch(updateToPastes(paste));
    } else {
      //Create

      title.trim().length < 1 || value.trim().length < 1
        ? toast.error('Fields should not be empty.')
        : dispatch(addToPastes(paste));
    }

    // After CREATING-UPDATING paste, we should clear the input fields
    setTitle('');
    setValue('');
    setSearchParams('');
  };

  return (
    <div>
      <div className='flex items-center gap-4'>
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
          onClick={createPaste}
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
