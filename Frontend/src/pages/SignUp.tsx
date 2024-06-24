import { useNavigate } from "react-router-dom";
import { useState } from "react";
import plus from "../assets/plus.png";
const SignUp = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");

    const handleRoleChange = (e:any) => {
      setRole(e.target.value);
    };
    
    const handleSubmit = ()=>{
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto w-auto size-28" src={plus} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">SignUp your account</h2>
        </div>
        {/* <form className="mt-8 space-y-6" onSubmit={handleSubmit}> */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="example"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
              value={role}
              onChange={handleRoleChange}
              required
            >
              <option value="">Select a role</option>
              <option value="Hospital">Hospital</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </div>
        {/* </form> */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Already a registered user?{' '}

          <a onClick={()=>{
            navigate("/signIn")
          }
            
          } className="font-medium text-indigo-600 hover:text-indigo-500">
            login to your account
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
