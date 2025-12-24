import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import GoogleLogin from './SocialLogin/GoogleLogin';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState('');
    const { createUser, updateUserProfile } = useAuth();
    const axisInstance = useAxios();

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log("Handle Image files : ", image);

        const formData = new FormData();
        formData.append("image", image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?expiration=60000&key=${import.meta.env.VITE_image_upload_key}`;
        const res = await axios.post(imageUploadUrl, formData);
        console.log("Uploaded Image Data: ", res.data);
        if (res.data) {
            setProfilePhoto(res.data.data.url)
        }
    }
    console.log("Photo Url : ", profilePhoto);



    const registerDataSubmit = (data) => {
        console.log("registerDataSubmit : ", data);

        createUser(data.email, data.password)
            .then(async (result) => {
                navigate('/')
                console.log("Create User Result: ", result);

                // update user info in the database
                const userInfo = {
                    email: data.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                }

                const userRes = await axisInstance.post('/users', userInfo);
                console.log("userRes.user : ", userRes.data);


                // update user profile
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePhoto
                }

                updateUserProfile(userProfile)
                    .then(() => {
                        console.log("Profile name and picture updated");
                    })
                    .catch(error => {
                        console.log("updateUserProfile error", error);
                    })
            })
            .catch(error => {
                console.log("Create User Error : ", error);
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100">
            <div className="card w-full max-w-md shadow-2xl bg-base-200 p-6">

                <h2 className="text-3xl font-extrabold text-center mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit(registerDataSubmit)} className="space-y-4">
                    <img className=' w-30 rounded-3xl' src={profilePhoto} alt="" />
                    <div>
                        <label className="label font-semibold">Name</label>
                        <div className="relative">
                            <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="input input-bordered w-full pl-10"
                                placeholder="Your Name"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">Name is required</p>
                        )}
                    </div>
                    <div>
                        <label className="label font-semibold">Profile Picture</label>
                        <div className="relative">
                            {/* <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" /> */}
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="input input-bordered w-full pl-10"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label font-semibold">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="input input-bordered w-full pl-10"
                                placeholder="Email address"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">Email is required</p>
                        )}
                    </div>

                    <div>
                        <label className="label font-semibold">Password</label>
                        <div className="relative">
                            <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                {...register('password', { required: true })}
                                className="input input-bordered w-full pl-10"
                                placeholder="Password"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">Password is required</p>
                        )}
                    </div>

                    <button className="btn btn-success w-full mt-2 text-lg">
                        Register
                    </button>

                    <div className="w-full">
                        <GoogleLogin />
                    </div>

                    <p className="text-center mt-4">
                        Already have an account?
                        <Link to="/login" className="link link-primary ml-1 font-semibold">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Register;