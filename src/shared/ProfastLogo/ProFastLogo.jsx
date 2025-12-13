import React from 'react';
import logo from '../../assets/logo.png'
const ProFastLogo = () => {
    return (
        <div className=' flex items-center'>
            <img src={logo} alt="" />
            <p className=' text-3xl mt-7 -ml-2 font-extrabold '>ProFast</p>
        </div>
    );
};

export default ProFastLogo;