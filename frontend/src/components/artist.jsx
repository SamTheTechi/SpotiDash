import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { URL } from '../util/url';
import { FRAMER_FADE, } from '../util/framer';
import { TimeRangeContext } from '../context/timeRange';

const TopArtist = () => {
  const { range } = useContext(TimeRangeContext);
  const [data, setData] = useState([]);

  const Artist = async () => {
    try {
      const response = await axios.post(`${URL}/api/v1/artists`, { range }, { withCredentials: true });
      const res = response.data.artists;
      setData(res);
    } catch (e) {
      console.error("Error fetching songs:", e);
    }
  };

  useEffect(() => {
    Artist();
  }, [range]);

  return (
    <>
      <section
        className={`flex flex-col sm:m-1.5 m-1 bg-green-600 overflow-auto w-[42%] rounded-[15px] overflow-x-hidden border-[3px] sm:border-[5px] border-[rgba(0,0,0,0.1)] `}>
        {data.map((items) => {
          let key = items.id;
          let Name = items.name;
          let imgUrl = items.images.find(
            (item) => item.height === 160 || item.height === 64
          )?.url;
          let Genres = items.genres.map((genre) => genre.name).join(', ');
          let ArtistUrl = items.external_urls.spotify;

          return (
            <ArtistLayer
              key={key}
              Name={Name}
              imgUrl={imgUrl}
              Genres={Genres}
              ArtistUrl={ArtistUrl}
            />
          );
        })}
      </section>
    </>
  );
};

const ArtistLayer = ({ imgUrl, Name, Genres, ArtistUrl }) => {
  const handleClick = () => {
    window.location.href = ArtistUrl;
  };

  return (
    <>
      <motion.article
        {...FRAMER_FADE}
        onClick={handleClick}
        className='px-1 py-2 flex hover:scale-[1.02] hover:text-black hover:underline transition duration-150 ease-in cursor-pointer '>
        <img
          src={imgUrl}
          alt={Name}
          className='aspect-square sm:h-[60px] h-[38px] rounded-[8px] shadow-customShadow hover:opacity-90 transition duration-200 ease-in'
        />
        <div className='flex flex-col p-1 pl-2 justify-around'>
          <div className='text-[10px] sm:text-base'>{Name}</div>
        </div>
      </motion.article>
    </>
  );
};

export default TopArtist;
