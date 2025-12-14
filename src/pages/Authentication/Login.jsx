import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log("Register Data: ", data);
    }

    return (
        <div className=' text-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                    <div><a className="link link-hover">Forgot password?</a></div>
                </fieldset>
                <div className=' text-center'>
                    <button className="btn btn-neutral mt-4">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;