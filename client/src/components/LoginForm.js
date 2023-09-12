'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return user ? (
    <p className="text-green-600 font-bold text-2xl">Successfully logged in</p>
  ) : (
    <div className="flex flex-col text-2xl items-center">
      <h2 className="mb-8">Login</h2>
      {/* Show submit errors */}
      {error && error.map((err) => <p className="text-red-600">{err.msg}</p>)}
      <form onSubmit={handleLogin} className="flex flex-col flex-1 gap-3">
        <div className="flex gap-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            className="w-full text-black flex-1"
            required
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className="w-full text-black flex-1"
            required
          />
        </div>
        <button type="submit" className="btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
