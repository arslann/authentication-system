'use client';
import withAuth from '@/lib/withAuth';
import React from 'react';
import { useSelector } from 'react-redux';

function page() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="h-screen flex items-center justify-center">
      {user && (
        <ul>
          <li>Username: {user.username}</li>
          <li>Role: {user.role}</li>
        </ul>
      )}
    </div>
  );
}

export default withAuth(page);
