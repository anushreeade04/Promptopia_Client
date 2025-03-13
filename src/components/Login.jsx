import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Login')
    const { setShowLogin, backendURL, setToken, setUser } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    
        try {
            let response;
            if (state === 'Login') {
                response = await axios.post(backendURL + '/api/user/login', { email, password });
            } else {
                response = await axios.post(backendURL + '/api/user/register', { name, email, password });
            }
    
            const { data } = response;
    
            if (data.success) {
                
                setToken(data.token);  
                setUser(data.user);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Authentication failed");
        }
    };
    

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    })

    

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler}
                className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' &&
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                        <img src={assets.profile_icon} alt="" width={30} />
                        <input onChange={e => setName(e.target.value)
                        } value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required />
                    </div>
                }


                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" width={16} />
                    <input onChange={e => setEmail(e.target.value)
                    } value={email} type="email" className='outline-none text-sm' placeholder='Email Id' required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" width={13} />
                    <input onChange={e => setPassword(e.target.value)
                    } value={password} type="password" className='outline-none text-sm' placeholder='Password' required />
                </div>

                <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

                <button className='bg-blue-600 w-full text-white py-2'>
                    {state === 'Login' ? 'Login' : 'Create account'}
                </button>


                {state == 'Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span></p>
                    :
                    <p className='mt-5 text-center' onClick={() => setState('Login')}>Already have an account? <span className='text-blue-600 cursor-pointer'>Login</span></p>}

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
            </form>

        </div>
    )
}

export default Login
