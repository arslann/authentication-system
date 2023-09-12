'use client';
import withAuth from '@/lib/withAuth';
import React from 'react';

function page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-xl text-red-600">Only admins can access this page</h1>
    </div>
  );
}

export default withAuth(page, ['admin']);
