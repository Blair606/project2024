import React from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import SignUp from '../../components/auth/SignUp';

const LearnerRegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Learner Registration
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Create your learner account to access all learning resources
            </p>
          </div>
          <SignUp userType="learner" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnerRegisterPage; 