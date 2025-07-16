// import { useState } from 'react'
// import { useNavigate } from "react-router";
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { Baseurl } from '../../services api/baseurl';

// export default function Register() {
//   const usenagi = useNavigate()
//   const [user, setuser] = useState({
//     name: '',
//     email: '',
//     password: '',
//     profile: null,

//   })
  

//   // Regsiter api here 
//   const handlsubmit = async (e) => {
//     e.preventDefault();
//     try {
//          const formadata = new FormData();
//          formadata.append('name',user.name);
//          formadata.append('email',user.email);
//          formadata.append('password',user.password);
//          formadata.append('profile',user.profile)
          
//          const res =  await axios.post(`${Baseurl}/api/auth/register`,formadata,{
//                headers:{
//                 "Content-Type":"multipart/form-data",
//                }
              
//          })
//         const data =  await res.data;
          
//            if (res.status === 200) {
//             toast.success(data.message)
//             setuser({
//               name: '',
//               email: '',
//               password: '',
//               profile: null,
//             })
//             usenagi('/login')
//            }

      
         
            
        

//     } catch (error) {
//       if (error && error.response && error.response.data) {
//         toast.error(error.response.data.message)
//       }
//        console.log(error)
//     }
    
   
//   }



//   // handle input value
//   const handlinput = (e) => {
//     const { name, value ,files} = e.target;
             
   
//     if(name === 'profile'){
//       setuser({ ...user, [name]: files[0]})
//     }else{
//       setuser({ ...user, [name]: value })
//     }

//   }

//   const hanldloign = () => {
//     usenagi('/login')
//   }


//   return (
//     <>
//       <section className="bg-gray-100 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center  px-6 py-7 mx-auto md:h-screen lg:py-0">

//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-2 md:space-y-0 sm:p-8">
//               <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Register
//               </h1>
//               <form className="space-y-2 md:space-y-0" onSubmit={handlsubmit}>
//                 <div>

//                   <label for="profile"
//                     className="flex text-white text-base px-5 py-0 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                
                  
//                     <img
//                       src={user.profile ? URL.createObjectURL(user.profile) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_aZ5dsa-PRx_4ozdsfmRi6kNoZdG18gCv8Em9EtWrHCYJD3OT5sKer3_UfZ4c2uc8lrg&usqp=CAU'}
//                       alt="Profile"
//                       className=" rounded-[50%] w-[95px] h-[95px] object-cover"
//                     />

//                     <input type="file" id='profile' name='profile'  onChange={handlinput} className="hidden" />
//                   </label>
//                 </div>
//                 <div>
//                   <label for="text" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">Name</label>
//                   <input type="text" name="name" value={user.name} onChange={handlinput} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required="" />
//                 </div>
//                 <div>
//                   <label for="email" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">Email</label>
//                   <input type="email" name="email" value={user.email} onChange={handlinput} id="password" placeholder="Enter your email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                 </div>
//                 <div>
//                   <label for="password" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">password</label>
//                   <input type="password" name="password" value={user.password} onChange={handlinput} id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" required="" />
//                 </div>
//                 <div>
//                 <button type="submit" className="mt-4 w-full  bg-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  ">Register</button>
//                 </div>
    
               
//                 <p className="text-gray-800 text-sm !mt-8 text-center ">Don't have an account? <a href="javascript:void(0);" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold" onClick={hanldloign}>Login</a></p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//     </>
//   )
// }


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
              placeholder="agent@agency.gov"
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
