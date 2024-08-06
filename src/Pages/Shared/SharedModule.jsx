import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Suspense } from 'react';

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};