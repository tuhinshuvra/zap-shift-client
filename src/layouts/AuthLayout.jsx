import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProFastLogo from '../shared/ProfastLogo/ProFastLogo';

const AuthLayout = () => {


    return (
        <div className=" p-12 bg-base-200   max-w-7xl mx-auto">
            <div className=''>
                <Link to="/"> <ProFastLogo></ProFastLogo></Link>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className=' flex-1'>
                    <img
                        src={authImg}
                        alt='Auth_Image'
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                <div className=' flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;