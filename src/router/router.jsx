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
            }
        ]
    }
]);