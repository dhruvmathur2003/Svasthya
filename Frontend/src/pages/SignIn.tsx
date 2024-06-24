import { useNavigate } from "react-router-dom";
import { useState } from "react";
import plus from "../assets/plus.png";
import axios from 'axios';

import LoaderModal from '../Components/LoaderModal';

const backendUrl = import.meta.env.VITE_API_URL as string;


const SignIn = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loader,setLoader] = useState(false);

    const handlesub = () =>{
      setLoader(true);
      let data = JSON.stringify({
        email,
        password
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${backendUrl}/users/Auth/Login`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoader(false);
        navigate('/Dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <LoaderModal isOpen={loader}></LoaderModal>
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto w-auto size-28" src={plus} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              onClick={handlesub}
              className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          New user?{' '}
          <a onClick={()=>{
            navigate("/signUp")
          } }className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
