/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../shared/AuthCard";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
import React, { useState } from "react";
import { handleSignIn } from "../../api/AuthApi";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/UserSlice";

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatas((pre) => ({
      ...pre,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null);
    try {
      const res = await handleSignIn(datas);
      setIsLoading(false)
        if(res.status === 200){
            navigate('/home',{ replace: true })
            dispatch(login({user:res.data.user}))

        }
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to access your personalized article feeds"
      >
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="youremail@example.com"
            required
            onChange={handleChange}
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="••••••••"
            required
            onChange={handleChange}
          />

          <div className="flex justify-between items-center mb-6">
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="primary" disabled={isLoading} isLoading={isLoading} >
  {isLoading ? "Loading.." : "Sign In"}
</Button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
    Sign up now
  </Link>

        </p>
      </AuthCard>
    </div>
  );
};

export default SignIn;
