import React from 'react'
import { useState } from 'react';
import LoginButton from './buttons/LoginButton';


type LonginFormProps = {
  setIsRegister: (value: boolean) => void;
};


function LoginForm({setIsRegister}:LonginFormProps) {
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
     
      return (
        <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
               Create an Account
            </h2>
         <form  className="space-y-4">
            
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                    required
                  />
                </>
    
    
              {/* {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )} */}
            <LoginButton buttonName='Login'/>

            </form>
    
             <p className="mt-4 text-center text-gray-700 text-sm">
            change
              <button
                type="button"
                className="text-blue-600 ml-1 hover:underline"
                onClick={()=>setIsRegister(true)}
              >
               Register here
              </button>
            </p>
        </div>
      )

    }
export default LoginForm;
