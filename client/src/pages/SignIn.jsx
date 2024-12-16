// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux'
// import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';






// export default function SignIn() {
   
//     const [formData, setFormData] = useState({});
//     const { loading, error } = useSelector((state) => state.user);
//     //here state in the function means global state which is coming from the store
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData, [e.target.id]: e.target.value,
//         })
//     };
    
//     const handleSubmit =async (e) => {
//         e.preventDefault();
//         try {
//             dispatch(signInStart());
//             const res = await fetch('/api/auth/signin',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(formData),
//                 }
//             );
//             const data = await res.json();
//             if (data.success === false) {
//                 dispatch(signInFailure(data.message));
//                 return;
//             }
//             dispatch(signInSuccess(data));
//             navigate('/')
            
//         } catch (error) {
//             dispatch(signInFailure(error, message));
//         }
//     }

//     return (
//         <div className="font-[sans-serif] bg-white md:h-full ">
//             <div className="grid md:grid-cols-2 items-center gap-4 h-half ">
//                 {/* Image Section */}
//                 <div className="max-md:order-1 p-2 md:block hidden mt-3">
//                     <img
//                         src="https://readymadeui.com/signin-image.webp"
//                         className="lg:max-w-[75%] w-full h-auto object-contain block mx-auto"
//                         alt="login-image"
//                     />
//                 </div>

//                 {/* Form Section */}
//                 <div className="flex items-center md:p-4 p-3 bg-[#0C172C] h-full lg:w-10/12 lg:ml-auto mt-3">
//                     <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto">
//                         <div className="mb-6">
//                             <h3 className="text-xl font-bold text-yellow-400">Sign In</h3>
//                         </div>

//                         {/* Email Field */}
//                         <div className="mt-4">
//                             <label className="text-white text-lg block mb-1">Email</label>
//                             <div className="relative flex items-center">
//                                 <input
//                                     name="email"
//                                     type="text"
//                                     required
//                                     className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
//                                     placeholder="Enter email"
//                                     onChange={handleChange}
//                                     id='email'
//                                 />
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2" viewBox="0 0 682.667 682.667">
//                                     <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* Password Field */}
//                         <div className="mt-4">
//                             <label className="text-white text-lg block mb-1">Password</label>
//                             <div className="relative flex items-center">
//                                 <input
//                                     name="password"
//                                     type="password"
//                                     required
//                                     className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
//                                     placeholder="Enter password"
//                                     onChange={handleChange}
//                                     id='password'
//                                 />
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2 cursor-pointer" viewBox="0 0 128 128">
//                                     <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* Terms and Conditions */}
//                         <div className="flex items-center mt-4">
//                             <input id="remember-me" name="remember-me" type="checkbox" className="h-3 w-3 shrink-0 rounded" />
//                             <label htmlFor="remember-me" className="text-white ml-2 text-xs">
//                                 I accept the <a href="#" className="text-yellow-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
//                             </label>
//                         </div>

//                         {/* Register Button */}
//                         <div className="mt-8">
//                             <button
//                                 disabled={loading}
//                                 type="submit"
//                                 className="w-full mb-2 shadow-xl py-2 px-4 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
//                             >
//                                {loading?"Loading...":'Sign In'}
//                             </button>
//                             <OAuth/>
//                             <p className="text-xs text-white mt-6">
//                             <Link to={"/sign-up"}>
//                                Do not have an account? <a href="#" className="text-yellow-400 font-semibold hover:underline ml-1">Sign-Up</a>
//                             </Link>
//                             </p>
//                             {error && <p className='text-red-500 mt-5'>{ error}</p>}
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="bg-gray-900 text-white font-sans min-h-screen flex items-center justify-center">
            <div className="grid md:grid-cols-2 items-center gap-4 w-full max-w-7xl px-4 md:px-0">
                {/* Image Section */}
                <div className="hidden md:block p-6">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                        alt="login-image"
                    />
                </div>

                {/* Form Section */}
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-3xl font-semibold text-yellow-400 text-center">Sign In</h3>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-lg text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full mt-2 bg-transparent text-white border-b-2 border-gray-300 focus:border-yellow-400 py-2 px-3 outline-none"
                                placeholder="Enter email"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-lg text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full mt-2 bg-transparent text-white border-b-2 border-gray-300 focus:border-yellow-400 py-2 px-3 outline-none"
                                placeholder="Enter password"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-yellow-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-xs text-white">
                                I accept the <a href="#" className="text-yellow-400 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </button>
                        </div>

                        {/* OAuth Section */}
                        <OAuth />

                        {/* Sign Up Link */}
                        <div className="text-center text-xs text-white">
                            <p>
                                Don’t have an account? <Link to="/sign-up" className="text-yellow-400 hover:underline">Sign-Up</Link>
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
