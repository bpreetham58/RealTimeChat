import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Baseurl } from '../../services api/baseurl';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/fetaures/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userlogin, setuserlogin] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setuserlogin({ ...userlogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await axios.post(`${Baseurl}/api/auth/login`, userlogin);
      const data = resp.data;

      if (resp.status === 200) {
        toast.success(`✅ ${data.message}`);
        setuserlogin({ email: '', password: '' });
        dispatch(setCredentials({ user: data.user, token: data.token }));
        navigate('/');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => navigate('/register');

  return (
    <div className="bg-black min-h-screen flex items-center justify-center font-mono text-white">
      <div className="bg-neutral-900 border border-neutral-700 shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md animate-intel">
        <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-wide text-cyan-400">
          Welcome to Chatbhaji
        </h2>
        <p className="text-neutral-400 text-center mt-1 text-xs tracking-wider">
          Authorized Personnel Only
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-neutral-300 text-xs uppercase tracking-widest">
               Email
            </label>
            <input
              name="email"
              value={userlogin.email}
              onChange={handleInput}
              type="email"
              required
              placeholder="test@gmail.com"
              className="mt-1 w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-600 rounded focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-neutral-300 text-xs uppercase tracking-widest">
              Password
            </label>
            <input
              name="password"
              value={userlogin.password}
              onChange={handleInput}
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-600 rounded focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-sm tracking-widest rounded bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 font-bold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'VERIFYING...' : 'ENTER'}
          </button>
        </form>

        <p className="text-neutral-500 text-xs text-center mt-6 tracking-wider">
          Need access?{' '}
          <button
            onClick={goToRegister}
            className="text-cyan-500 font-semibold hover:underline"
          >
            Register yourself
          </button>
        </p>
      </div>

      <style>
        {`
        .animate-intel {
          animation: fadeIn 1s ease-in-out, glow 3s infinite alternate;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          from { box-shadow: 0 0 10px #0ff3, 0 0 20px #0ff2; }
          to { box-shadow: 0 0 20px #0ff5, 0 0 30px #0ff3; }
        }
        `}
      </style>
    </div>
  );
}
