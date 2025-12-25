import { Link, Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";
import ProFastLogo from "../shared/ProfastLogo/ProFastLogo";
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaMapMarkedAlt, FaUserEdit, FaUserCheck, FaUserClock } from "react-icons/fa";

const DashboardLayout = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none ">
                            <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">Dashboard</div>
                    </div>

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 px-4 font-extrabold italic">
                        <ProFastLogo />

                        <li>
                            <Link to="/dashboard/profile" className="flex items-center gap-3">
                                <FaHome className="text-lg text-primary" />
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/myParcels" className="flex items-center gap-3">
                                <FaBoxOpen className="text-lg text-primary" />
                                My Parcels
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/paymentHistory" className="flex items-center gap-3">
                                <FaMoneyCheckAlt className="text-lg text-primary" />
                                Payment History
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/track" className="flex items-center gap-3">
                                <FaMapMarkedAlt className="text-lg text-primary" />
                                Track a Package
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/riders" className="flex items-center gap-3">
                                <FaUserCheck className="text-lg text-primary" />
                                All Riders
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/active-riders" className="flex items-center gap-3">
                                <FaUserCheck className="text-lg text-primary" />
                                Active Riders
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/pending-riders" className="flex items-center gap-3">
                                <FaUserClock className="text-lg text-primary" />
                                Pending Riders
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/profile" className="flex items-center gap-3">
                                <FaUserEdit className="text-lg text-primary" />
                                Update Profile
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;