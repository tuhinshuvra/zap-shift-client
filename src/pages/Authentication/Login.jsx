import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from './SocialLogin/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import Loader from '../../shared/loader/Loader';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createLogin, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const onSubmit = data => {
        // console.log("Login Data: ", data);
        createLogin(data?.email, data?.password)
            .then(result => {
                navigate(from);
                console.log("Login Result: ", result);
            })
            .catch(error => console.log("Login Error", error))
    }

    if (loading) {
        <Loader></Loader>
    }


    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <h2 className="text-4xl font-extrabold text-center mb-6">
                    Welcome Back 👋
                </h2>

                <div>
                    <label className="label font-semibold">Email</label>
                    <div className="relative">
                        <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full pl-10"
                            placeholder="Enter your email"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">Email is required</p>
                    )}
                </div>

                <div>
                    <label className="label font-semibold">Password</label>
                    <div className="relative">
                        <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="input input-bordered w-full pl-10"
                            placeholder="Enter your password"
                        />
                    </div>
                    {errors.password?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1">Password is required</p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className="text-red-500 text-sm mt-1">
                            Password must be at least 6 characters
                        </p>
                    )}
                </div>

                <div className="flex justify-between text-sm">
                    <Link className="link link-hover text-primary">
                        Forgot password?
                    </Link>
                    <Link to="/register" className="link link-hover text-primary font-semibold">
                        New user? Register
                    </Link>
                </div>

                <button className="btn btn-success w-full text-black text-lg mt-2">
                    Login
                </button>

            </form>

            <GoogleLogin />
        </div>
    );
};

export default Login;