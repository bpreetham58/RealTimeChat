import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SideBar } from '../components/SideBar';
import { Chat } from '../components/Chat';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Baseurl } from '../../services api/baseurl';

export default function Home() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(Baseurl);
    setSocket(newSocket);

    if (user && user._id) {
      newSocket.emit('AddUserSocket', user._id);
    }

    return () => newSocket.close();
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <section
      className="bg-gradient-to-tr from-[#e0e7ff] via-[#f1f5f9] to-[#e0f2fe] min-h-screen"
    >
      <div className="flex flex-row h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-[257px] h-full bg-gray-900 text-white">
          <SideBar socket={socket} />
        </div>

        {/* Chat Section */}
        <div className="flex-grow h-full bg-gray-50">
          <Chat socket={socket} />
        </div>
      </div>
    </section>
  );
}
