import React from 'react'
import SignIn from '../components/auth/SignIn'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

function Login() {
  return (
    <div>
        <Navbar />
        <SignIn />
        <Footer />
    </div>
  )
}

export default Login