import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../shared/ProfastLogo/ProFastLogo";
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaMapMarkedAlt, FaUserEdit, FaUserCheck, FaUserClock, FaMotorcycle, FaUnity, } from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import Loader from "../shared/loader/Loader";

const DashboardLayout = () => {
    const { isAdmin, isUser, isLoading } = useUserRole();

    if (isLoading) return <Loader />;

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none">
                            <label
                                htmlFor="my-drawer"
                                aria-label="open sidebar"
                                className="btn btn-square btn-ghost"
                            >
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

                    {/* Main content */}
                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    <ul className="menu bg-base-200 min-h-full w-80 px-4 font-extrabold italic">
                        <ProFastLogo />

                        {/* User accessible links */}
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                }
                            >
                                <FaHome className="text-lg text-primary" />
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/myParcels"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                }
                            >
                                <FaBoxOpen className="text-lg text-primary" />
                                My Parcels
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/paymentHistory"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                }
                            >
                                <FaMoneyCheckAlt className="text-lg text-primary" />
                                Payment History
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/track"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                }
                            >
                                <FaMapMarkedAlt className="text-lg text-primary" />
                                Track a Package
                            </NavLink>
                        </li>

                        {/* Admin-only links */}
                        {isAdmin && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/assign-riders"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                        }
                                    >
                                        <FaMotorcycle className="text-lg text-primary" />
                                        Assign Riders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/riders"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                        }
                                    >
                                        <FaUnity className="text-lg text-primary" />
                                        All Riders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/active-riders"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                        }
                                    >
                                        <FaUserCheck className="text-lg text-primary" />
                                        Active Riders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/pending-riders"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                        }
                                    >
                                        <FaUserClock className="text-lg text-primary" />
                                        Pending Riders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/make-admin"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                        }
                                    >
                                        <FaUserEdit className="text-lg text-primary" />
                                        Manage Admin
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Profile (all users) */}
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "text-primary font-bold" : ""}`
                                }
                            >
                                <FaUserEdit className="text-lg text-primary" />
                                Update Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
