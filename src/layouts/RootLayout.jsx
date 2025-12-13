import React from 'react';
import { Outlet } from 'react-router';
import Home from '../pages/Home/Home/Home';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Navbar/Footer/Footer';

const RootLayout = () => {
    return (
        <div className=' bg-gray-100'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;