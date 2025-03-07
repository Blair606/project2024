import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from 'react-hook-form';

interface SignInForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm<SignInForm>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmitForm = async (data: SignInForm) => {
    setError(null);

    if (!data.email || !data.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await login(data.email, data.password);
      
      // Use user from context
      switch (user?.role) {
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'teacher':
          navigate('/dashboard/teacher');
          break;
        case 'parent':
          navigate('/dashboard/parent');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-gray-800 transition-colors focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/signup"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Dont have an  account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;