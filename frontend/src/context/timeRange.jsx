import React, { useState, createContext } from 'react';

const TimeRangeContext = createContext();
const TimeRangeProvider = ({ children }) => {
  const [range, setRange] = useState('short');
  return <TimeRangeContext.Provider value={{ range, setRange }}>{children}</TimeRangeContext.Provider>;
};

export { TimeRangeContext, TimeRangeProvider };
