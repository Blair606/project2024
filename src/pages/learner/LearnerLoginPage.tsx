import React from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import SignIn from '../../components/auth/SignIn';

const LearnerLoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Learner Portal
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your learning resources and track your progress
            </p>
          </div>
          
          <SignIn userType="learner" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnerLoginPage; 