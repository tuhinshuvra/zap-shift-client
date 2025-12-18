import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import GoogleLogin from './SocialLogin/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import Loader from '../../shared/loader/Loader';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createLogin, loading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        // console.log("Login Data: ", data);
        createLogin(data?.email, data?.password)
            .then(result => {
                navigate('/');
                console.log("Login Result: ", result);
            })
            .then(error => {
                console.log("Login Error", error);
            })
    }

    if (loading) {
        <Loader></Loader>
    }


    return (
        <div className=' text-center'>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <h2 className=' text-start text-4xl font-extrabold'>Welcome Back</h2>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: true
                        })}
                        className="input"
                        placeholder="Email" />
                    {
                        errors.email?.type === 'required' &&
                        <p className=' text-red-500 font-bold italic'>Email is required</p>
                    }

                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                        className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' &&
                        <p className=' text-red-500 font-bold italic'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' &&
                        <p className=' text-red-500 font-bold italic'>Password must be 6 character or longer</p>
                    }

                    <div className=' flex  '>
                        <Link className="link link-hover">Forgot password?</Link>
                        <Link className="link link-hover  ml-26" to="/register">New User? go Register</Link>
                    </div>

                    <button className="btn btn-success mt-4 text-black">Login</button>

                    <GoogleLogin></GoogleLogin>

                </fieldset>

            </form>
        </div>
    );
};

export default Login;