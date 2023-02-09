import { Outlet } from '@remix-run/react';

export default function AuthPageLayout() {
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md px-10 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
