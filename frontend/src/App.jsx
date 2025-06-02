import React from 'react';
import Login from './pages/login';
import { Route, Routes } from 'react-router-dom';
import './Tailwind.css';
import Dashboard from './pages/dashboard';
import Navbar from './components/navbar';

const DashboardComp = () => {
  return (
    <main className='bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex items-center justify-items-center flex-col'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        {/* <Route path='/weekly' element={<DiscoverWeekly />}></Route> */}
        {/* <Route path='/blend' element={<FilterBlend />}></Route> */}
        {/* <Route path='/search' element={<DeepSearch />}></Route> */}
      </Routes>
    </main>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/dashboard/*' element={<DashboardComp />}></Route>
    </Routes>
  );
};

export default App;
