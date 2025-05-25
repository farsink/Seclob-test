/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { login } from "../api/userAPi";
// import SignupPanel from "../Components/SignUppanel";

const SignIn: React.FC = () => {
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission

    if (Form.email === "" || Form.password === "") {
      alert("please fill all the fields");
    } else {
      try {
        const response = await login(Form.email, Form.password);
        console.log("response :", response);

        if ((response as any).status === 200) {
          sessionStorage.setItem("token", (response as any).data.token);
          sessionStorage.setItem("user", (response as any).data.user.name);
          sessionStorage.setItem("userId", (response as any).data.user.id);

          alert("Login Successful");
          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);
        }
        if ((response as any).status >= 400) {
          alert("Invalid Credentials");
        }
      } catch (error) {
        console.error("error :", error);
      }
    }
  };
  return (
    <div className='flex min-h-screen max-h-screen'>
      <>
        {/* Left side - Sign In Form */}
        <div className='flex w-[70%] items-center justify-center bg-white'>
          <div className='w-full max-w-md'>
            <h1 className='mb-8 text-center text-3xl font-bold text-amber-500'>
              Sign In to
              <br />
              Your Account
            </h1>

            <form className='mb-6 space-y-4' onSubmit={handleSubmit}>
              <div className='relative'>
                <input
                  onChange={(e) => setForm({ ...Form, email: e.target.value })}
                  type='email'
                  placeholder='Email'
                  className='w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50'
                />
              </div>
              <div className='relative'>
                <input
                  type='password'
                  onChange={(e) =>
                    setForm({ ...Form, password: e.target.value })
                  }
                  placeholder='Password'
                  className='w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50'
                />
              </div>

              <div className='mb-6 text-center'>
                <a
                  href='#'
                  className='text-sm text-gray-600 hover:text-amber-500'
                >
                  forgot password?
                </a>
              </div>

              <button
                type='submit'
                className='w-full rounded-full bg-amber-500 py-3 text-white transition-colors hover:bg-amber-600'
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Welcome Message */}
        <div className='relative flex w-[30%] flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 px-8 py-12 text-white overflow-hidden'>
          <div className='z-10 text-center'>
            <h1 className='mb-3 text-3xl font-bold'>Hello Friend!</h1>
            <p className='mb-8 text-center text-blue-100'>
              Enter your personal details and start your journey with us
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className='rounded-full border-2 border-white px-8 py-3 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-white/10'
            >
              SIGN UP
            </button>
          </div>

          {/* Decorative Elements */}
          <div className='absolute right-20 top-20 h-16 w-16 rotate-45 transform rounded bg-blue-600/30'></div>
          <div className='absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/20'></div>
          <div className='absolute bottom-16 right-12 h-10 w-10 rotate-45 transform rounded bg-blue-500/30'></div>
        </div>
      </>
      )
    </div>
  );
};

export default SignIn;
