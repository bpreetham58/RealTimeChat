import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Baseurl } from '../../services api/baseurl';
import { logout } from '../redux/fetaures/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reomveSelectedUser, setSelectedUser } from '../redux/fetaures/userSlice';

export const SideBar = ({ socket }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [search, setSearch] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const resp = await axios.get(`${Baseurl}/api/Auth/get_user`);
      setUserdata(resp.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    if (socket) socket.disconnect();
    dispatch(reomveSelectedUser());
    navigate('/login');
  };

  const handleUserSelect = (selectedUser) => {
    dispatch(setSelectedUser(selectedUser));
    setSidebarOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('getUsers', (users) => {
        setOnlineUsers(users);
      });
    }
    return () => {
      if (socket) socket.off('getUsers');
    };
  }, [socket]);

  const filteredUsers = userdata
    .filter((u) => u._id !== user._id)
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  const isUserOnline = (userId) => {
    return onlineUsers.some((onlineUser) => onlineUser.userId === userId);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </button>

      <div
        className={`fixed md:static top-0 left-0 h-screen bg-gray-900 text-white w-64 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:translate-x-0 md:block shadow-lg z-40`}
      >
        <div className="p-4 flex justify-between items-center bg-gray-800">
          <span className="font-bold text-lg">Chatbhaji</span>
          <img src={user?.profile} alt="" className="w-10 h-10 rounded-full" />
        </div>

        <div className="p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div className="overflow-y-auto p-4">
          {filteredUsers.map((curUser) => (
            <div
              key={curUser._id}
              onClick={() => handleUserSelect(curUser)}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              <div className="relative">
                <img src={curUser.profile} alt="" className="w-10 h-10 rounded-full" />
                {isUserOnline(curUser._id) && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                )}
              </div>
              <span>{curUser.name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2 mt-4 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          <CiLogout className="inline mr-2" />
          Logout
        </button>
      </div>
    </>
  );
};
