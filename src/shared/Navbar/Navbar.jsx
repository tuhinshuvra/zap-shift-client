import React from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from '../ProfastLogo/ProFastLogo';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { createSignOut, loading, user } = useAuth();

    console.log("Current LoginUser Navbar: ", user?.email);

    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
    </>

    const handSignOut = () => {
        createSignOut()
            .then(result => {
                console.log("handSignOut result : ", result);
            })
            .then(error => {
                console.log("Handle SignOur Error : ", error);
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl"><ProFastLogo></ProFastLogo></div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            {user ?
                <div className=' navbar-end'>
                    <p className=' font-bold italic text-primary'>{user?.email}</p>
                    <Link onClick={handSignOut} className="btn ml-2 btn-warning text-blue-900 btn-sm" to="/">SignOut</Link>
                </div>
                :
                <div className="navbar-end">
                    <Link className="btn" to="/login">Login</Link>
                </div>
            }

        </div>
    );
};

export default Navbar;