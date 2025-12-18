import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import GoogleLogin from './SocialLogin/GoogleLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser } = useAuth();
    const registerDataSubmit = (data) => {
        console.log("registerDataSubmit : ", data);

        createUser(data.email, data.password)
            .then(result => {
                console.log("Create User Result: ", result);
            })
            .catch(error => {
                console.log("Create User Error : ", error);
            })
    }

    return (
        <div className=' text-center'>
            <form className='' onSubmit={handleSubmit(registerDataSubmit)}>
                <fieldset className="fieldset">
                    <h2 className=' text-start font-extrabold text-4xl'>Create an Account</h2>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input"
                        placeholder="Email" />
                    {
                        errors.email?.type === 'required' &&
                        <p className=' text-red-600 font-bold italic text-start' >Email is required</p>
                    }

                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' &&
                        <p className=' text-red-600 font-bold italic text-start'>Password is required</p>
                    }


                    <Link className="link link-hover text-start " to="/login">Already have account? go Login</Link>
                </fieldset>
                <div className=' text-center'>
                    <button className="btn btn-neutral mt-4">Register</button>
                </div>
                <GoogleLogin></GoogleLogin>
            </form>
        </div>
    );
};

export default Register;