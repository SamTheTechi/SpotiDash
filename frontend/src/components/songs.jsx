import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { URL } from '../util/url';
import { FRAMER_FADE } from '../util/framer';
import { TimeRangeContext } from '../context/timeRange';

const TopSongs = () => {
  const { range } = useContext(TimeRangeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const Tracks = async () => {
      try {
        const response = await axios.post(`${URL}/api/v1/songs`, { range }, { withCredentials: true });
        const res = response.data.trackes;
        setData(res);
      }
      catch (e) {
        console.error("Error fetching songs:", e);
      }

    };
    Tracks();
  }, [range]);

  return (
    <>
      <section
        className={`flex flex-col sm:m-1.5 m-1 bg-orange-600 overflow-auto w-[58%] overflow-x-hidden rounded-[15px] border-[3px] sm:border-[5px] border-[rgba(0,0,0,0.1)] `}>
        {data.map((items) => {
          let Name = items.name.split(`-`)[0];
          let Artist = items.artists.map((artist) => artist.name).slice(0, 2).join(', ');;
          let imgObj = items.album.images.find((item) => item.height === 64);
          let imgUrl = imgObj ? imgObj.url : null;
          if (!imgUrl) {
            return <p key={items.uri}>no valid image</p>;
          }

          return (
            <>
              <motion.article
                {...FRAMER_FADE}
                className={`px-1 py-2 flex rounded-[10px] hover:scale-[1.02] hover:text-black transition duration-150 ease-in cursor-pointer`}>
                <img
                  src={imgUrl}
                  alt={Name}
                  className={`aspect-square sm:h-[60px] h-[38px] rounded-[8px] shadow-customShadow transition duration-200 ease-in`}
                />
                <div className='flex flex-col  sm:p-1 sm:pl-2 pl-1 justify-around'>
                  <p className='text-[10px] sm:text-base'>{Name}</p>
                  <p className='font-light hidden text-sm sm:block'>{Artist}</p>
                </div>
              </motion.article>
            </>

          );
        })}
      </section>
    </>
  );
};

export default TopSongs;
