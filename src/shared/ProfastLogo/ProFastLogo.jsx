import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';
const ProFastLogo = () => {
    return (
        <Link className=' flex items-center' to="/">
            <img src={logo} alt="" />
            <p className=' text-3xl mt-7 -ml-2 font-extrabold '>ProFast</p>
        </Link>
    );
};

export default ProFastLogo;