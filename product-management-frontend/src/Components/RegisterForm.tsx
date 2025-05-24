import React, { useState } from "react";

import { User, Mail, Lock } from "lucide-react";

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    // Here you would typically handle user registration
  };

  return (
    <div className='flex flex-col justify-center h-full px-8 md:px-16 py-8 animate-fadeInUp'>
      <h1 className='text-3xl md:text-4xl font-bold mb-6 text-gray-800'>
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='relative'>
          <User
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='pl-10 bg-gray-50 border-gray-200'
            required
          />
        </div>

        <div className='relative'>
          <Mail
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='pl-10 bg-gray-50 border-gray-200'
            required
          />
        </div>

        <div className='relative'>
          <Lock
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='pl-10 bg-gray-50 border-gray-200'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-amber-500 hover:bg-amber-600 text-white'
        >
          SIGN UP
        </button>
      </form>

      <div className='mt-8 text-center md:hidden'>
        <p className='text-sm text-gray-500'>Already have an account?</p>
        <button
          onClick={onToggleForm}
          className='mt-2 text-amber-500 font-semibold hover:text-amber-600 transition-colors'
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
