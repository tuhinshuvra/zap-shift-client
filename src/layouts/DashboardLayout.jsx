import { Link, Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
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
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        <li><Link to="/dashboard/myParcels">My Parcels</Link></li>
                        <li><Link> Sidebar Item 2</Link></li>
                        <li><Link> Sidebar Item 3</Link></li>
                        <li><Link> Sidebar Item 4</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;