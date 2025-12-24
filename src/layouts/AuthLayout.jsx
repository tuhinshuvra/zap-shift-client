import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProFastLogo from '../shared/ProfastLogo/ProFastLogo';

const AuthLayout = () => {


    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-6">

                {/* Logo */}
                <div className="mb-8">
                    <ProFastLogo />
                </div>

                {/* Auth Card */}
                <div className="
            grid 
            grid-cols-1 
            lg:grid-cols-2 
            gap-10 
            items-center
            bg-base-200
            rounded-2xl
            shadow-xl
            p-8
        ">

                    {/* LEFT SIDE — Form */}
                    <div className="w-full">
                        <Outlet />
                    </div>

                    {/* RIGHT SIDE — Image */}
                    <div className="hidden lg:flex justify-center">
                        <img
                            src={authImg}
                            alt="Authentication"
                            className="
                        max-w-md 
                        w-full 
                        rounded-xl 
                        shadow-lg 
                        hover:scale-105 
                        transition-transform 
                        duration-300
                    "
                        />
                    </div>

                </div>
            </div>
        </div>


    );
};

export default AuthLayout;