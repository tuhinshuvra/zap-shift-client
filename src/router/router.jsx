import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import About from "../pages/About/About";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/Payment/TrackParcel/TrackParcel";
import UserProfile from "../pages/UserProfile/UserProfile";
import BeARider from "../pages/Dashboard/RidersZone/BeARider";
import PendingRiders from "../pages/Dashboard/RidersZone/PendingRiders";
import ActiveRiders from "../pages/Dashboard/RidersZone/ActiveRiders";
import AllRiders from "../pages/Dashboard/RidersZone/AllRiders";
import ManageAdmins from "../pages/Dashboard/MakeAdmin/ManageAdmin";
import ForbiddenAccess from "../shared/ForbiddenAccess";
import AdminRoute from "../routes/AdminRoute";
import AssignRiders from "../pages/Dashboard/RidersZone/AssignRiders";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'about',
                Component: About
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('./serviceCenter.json')
            },
            {
                path: 'sendParcel',
                element: <PrivateRoute>  <SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('./serviceCenter.json')
            },
            {
                path: 'beARider',
                element: <PrivateRoute> <BeARider></BeARider> </PrivateRoute>,
                loader: () => fetch('./serviceCenter.json')
            },
            {
                path: 'forbidden',
                Component: ForbiddenAccess
            },

        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'track',
                Component: TrackParcel
            },
            {
                path: 'riders',
                Component: AllRiders
            },
            {
                path: 'assign-riders',
                element: <AdminRoute>
                    <AssignRiders></AssignRiders>
                </AdminRoute>
            },
            {
                path: 'active-riders',
                element: <AdminRoute>
                    <ActiveRiders></ActiveRiders>
                </AdminRoute>
            },
            {
                path: 'pending-riders',
                element: <AdminRoute>
                    <PendingRiders></PendingRiders>
                </AdminRoute>
            },
            {
                path: 'make-admin',
                element: <AdminRoute>
                    <ManageAdmins></ManageAdmins>
                </AdminRoute>
            },
            {
                path: 'profile',
                Component: UserProfile
            },
        ]
    }
]);