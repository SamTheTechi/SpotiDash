import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../util/url';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/profile`, { withCredentials: true });
        const resData = response.data;
        console.log(resData);
        setUserInfo(resData.data);
      } catch (e) {
        throw e;
      }
    };
    userInfo();
  }, []);


  return (
    <header className='flex justify-between flex-row h-[12%] w-[100%] pt-2 px-5 md:pr-16 overflow-hidden font-semibold'>
      <div className='flex'>
        <img src='/logo.svg' alt='logo' className='h-8 md:h-10 pr-2' />
        <h2 className='items-center text-lg md:text-xl text-customLightGray font-semibold'>
          {userInfo !== '' ?
            <>
              Welcome,
              <span className='md:text-2xl text:xl text-white'>
                {' '}
                {userInfo.display_name}{' '}
              </span>
              <span className='text-base'>({userInfo.country})</span>
            </> :
            <></>
          }
        </h2>
      </div>
      <div className='flex items-center gap-2'>
        <h2 className='items-center text-lg md:text-xl text-customLightGray font-semibold'>
          {userInfo !== '' ?
            <>
              <span className='md:text-2xl text:lg text-customLightGray '>
                {userInfo.product}
                {' '}
              </span>
            </> :
            <></>
          }
        </h2>
        <img
          src={userInfo.images?.[0]?.url || `/UserIcon.png`}
          alt={userInfo.display_name}
          className='h-12 md:h-14 aspect-square object-cover rounded-[50%] border-[3px] border-customLightGray'
        />
      </div>
    </header>
  );
};

export default Navbar;
