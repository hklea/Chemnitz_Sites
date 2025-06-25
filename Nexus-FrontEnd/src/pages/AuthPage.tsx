import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage() {
  const [isRegister,setIsRegister] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/10 z-0"></div>
        <div className="z-10 w-full max-w-md p-8 bg-white bg-opacity-70 rounded-2xl shadow-2xl backdrop-blur-lg">
          {isRegister ? ( <RegisterForm setIsRegister={setIsRegister}/>) : <LoginForm setIsRegister={setIsRegister}/> }
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
