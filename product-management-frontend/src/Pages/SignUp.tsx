/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import FormInput from "../Components/ui/FormInput";
import Button from "../Components/ui/Button";
import { register } from "../api/userApi";

const SignupPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add actual signup logic here
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      alert("please fill all the fields");
    } else {
      try {
        const { name, email, password } = formData;
        const response = await register({ name, email, password });

        if ((response as any).status === 200) {
          alert("Signup successful!");

          sessionStorage.setItem("token", (response as any).data.token);
          sessionStorage.setItem("name", (response as any).data.user.name);

          setTimeout(() => {
            window.location.href = "/home";
          }, 500);
        } else if ((response as any).status === 401) {
          alert((response as any).data.error);
        } else if ((response as any).status === 405) {
          alert("check The " + (response as any).data.errors[0].path);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div className='flex min-h-screen w-full'>
      {/* right side */}
      <div className='relative flex w-[30%] flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 px-8 py-12 text-white overflow-hidden'>
        <div className='z-10 text-center'>
          <h1 className='mb-3 text-3xl font-bold'>Welcome Back!</h1>
          <p className='mb-8 text-center text-blue-100'>
            To keep connected with us please login with your personal info
          </p>
          <button
            onClick={() => (window.location.href = "/signin")}
            className='rounded-full border-2 border-white px-8 py-3 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-white/10'
          >
            SIGN IN
          </button>
        </div>
        {/* Decorative Elements */}
        {/* Decorative Elements */}
        <div className='absolute right-20 top-20 h-16 w-16 rotate-45 transform rounded bg-blue-600/30'></div>
        <div className='absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/20 overflow-hidden'></div>
        <div className='absolute bottom-16 right-12 h-10 w-10 rotate-45 transform rounded bg-blue-500/30 overflow-hidden'></div>{" "}
      </div>
      {/* Left side - Create Account Form */}
      <div className='flex w-[70%] items-center justify-center bg-white px-8 py-12'>
        <div className='w-full max-w-md'>
          <h1 className='mb-8 text-center text-3xl font-bold text-amber-500'>
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className='mb-6 space-y-4'>
            <FormInput
              icon={<User size={18} />}
              type='text'
              placeholder='Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              icon={<Mail size={18} />}
              type='email'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormInput
              icon={<Lock size={18} />}
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button variant='primary' className='mt-6 w-full' type='submit'>
              SIGN UP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPanel;
