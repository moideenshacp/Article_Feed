/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface AuthCardProps{
    children:any
    title:string
    subtitle:string
}


const AuthCard :React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
        {children}
      </div>
    );
  };
  
  export default AuthCard;