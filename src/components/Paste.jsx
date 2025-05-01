//Used to list all the items(pastes)

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { RxShare2 } from 'react-icons/rx';
import { AiOutlineEye } from 'react-icons/ai';
import { BsCopy } from 'react-icons/bs';

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

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
        className='p-2 w-full rounded-md mb-3 bg-gray-600'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-4 border border-white p-2'>
        <h2 className='text-white text-start font-extrabold text-2xl '>
          All pastes
        </h2>

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
                className='border border-white p-2 rounded-md flex'
                key={allFilteredDataIndex}
              >
                <div className='w-[26rem]  rounded-md text-start p-2'>
                  <div className=' overflow-x-auto text-green-300 wrap-break-word'>
                    {allFilteredData.title}
                  </div>
                  <div className='h-[80px] overflow-y-auto break-normal'>
                    {allFilteredData.content}
                  </div>
                </div>

                <div className=' pl-[10px] py-[20px]'>
                  <div className='flex gap-2 mb-4'>
                    {/* EDIT */}
                    <button>
                      <NavLink
                        to={`/?pasteId=${allFilteredData?._id}`}
                        className='text-white'
                      >
                        <CiEdit />
                      </NavLink>
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => {
                        handleDelete(allFilteredData?._id);
                      }}
                    >
                      <RiDeleteBinLine />
                    </button>

                    {/* SHARE:  */}
                    <button
                      onClick={() => {
                        const shareURL = `${window.location.origin}/view/${allFilteredData?._id}`;
                        navigator.clipboard.writeText(shareURL);
                        toast.success('Link copied for sharing!!!');
                      }}
                    >
                      <RxShare2 />
                    </button>

                    {/* VIEW: */}
                    <button>
                      <NavLink
                        className='text-white'
                        to={`/pastes/${allFilteredData?._id}`}
                      >
                        <AiOutlineEye />
                      </NavLink>
                    </button>

                    {/* COPY: */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(allFilteredData?.content);
                        toast.success('Copied to clipboard');
                      }}
                    >
                      <BsCopy />
                    </button>
                  </div>

                  {/* Formatted Date */}
                  <div className='text-right text-xs'>
                    Created at: &nbsp;
                    <strong className='text-green-500 text-base'>
                      {formattedDate}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
