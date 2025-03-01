import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import userSignup from '../Hook/userSignup';

const Signup = () => {
    const {loading, signup} = userSignup();

    const userData = useRef({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        userData.current = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value,
        };

        await signup(userData.current)
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-6">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl px-8 py-3 space-y-2">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600">Sign Up</h1>
                    <p className="text-gray-500">Create an account to get started</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your full name" required className="h-10 mt-1 p-3 rounded-md border-2 border-gray-200 focus:ring-2 focus:ring-slate-400 focus:outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required className="h-10 mt-1 p-3 rounded-md border-2 border-gray-200 focus:ring-2 focus:ring-slate-400 focus:outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required className="h-10 mt-1 p-3 rounded-md border-2 border-gray-200 focus:ring-2 focus:ring-slate-400 focus:outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required className="h-10 mt-1 p-3 rounded-md border-2 border-gray-200 focus:ring-2 focus:ring-slate-400 focus:outline-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full h-10 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
