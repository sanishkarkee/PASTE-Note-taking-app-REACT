import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='flex flex-row gap-4 justify-evenly mb-4 p-3 border border-gray-500 rounded-md'>
      <NavLink to='/' className='text-white'>
        Home
      </NavLink>

      <NavLink to='/pastes' className='text-white'>
        Pastes
      </NavLink>
    </div>
  );
};

export default NavBar;
