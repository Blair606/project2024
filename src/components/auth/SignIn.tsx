import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from 'react-hot-toast';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!email || !password) {
      toast.error("Please fill in all fields.", {
        duration: 4000,
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
      return;
    }

    try {
      const user = await auth.login(email.trim(), password);
      
      // Show success message
      toast.success("Successfully signed in!", {
        duration: 3000,
        style: {
          background: '#22c55e',
          color: 'white',
        },
      });
      
      // Redirect based on user role
      switch (user.role) {
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
      toast.error(
        err instanceof Error ? err.message : 'Invalid email or password', 
        {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: 'white',
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;