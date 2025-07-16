import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Baseurl } from '../../services api/baseurl';

export default function Register() {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    name: '',
    email: '',
    password: '',
    profile: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('profile', user.profile);

      const res = await axios.post(`${Baseurl}/api/auth/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = res.data;

      if (res.status === 200) {
        toast.success(data.message);
        setuser({ name: '', email: '', password: '', profile: null });
        navigate('/login');
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

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile') {
      setuser({ ...user, [name]: files[0] });
    } else {
      setuser({ ...user, [name]: value });
    }
  };

  const goToLogin = () => navigate('/login');

  return (
    <div className="bg-black min-h-screen flex items-center justify-center font-mono text-white">
      <div className="bg-neutral-900 border border-neutral-700 shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md animate-intel">
        <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-wide text-cyan-400">
           CHATBHAJI
        </h2>
        <p className="text-neutral-400 text-center mt-1 text-xs tracking-wider">
          Request Access
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <label htmlFor="profile" className="cursor-pointer">
              <img
                src={
                  user.profile
                    ? URL.createObjectURL(user.profile)
                    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover border-4 border-cyan-600 shadow-md"
              />
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={handleInput}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-neutral-300 text-xs uppercase tracking-widest">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInput}
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-600 rounded focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-300 text-xs uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="test@gmail.com"
              className="mt-1 w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-600 rounded focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-300 text-xs uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-600 rounded focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-sm tracking-widest rounded bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 font-bold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'PROCESSING...' : 'REGISTER'}
          </button>
        </form>

        <p className="text-neutral-500 text-xs text-center mt-6 tracking-wider">
          Already have Account?{' '}
          <button
            onClick={goToLogin}
            className="text-cyan-500 font-semibold hover:underline"
          >
            Sign In
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
