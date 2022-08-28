import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { getItemsByUser } from '~/models/items.server';
import { useOptionalUser } from '~/utils';

import AdminPageLayout from '~/layouts/AdminPage';

export const loader = async ({ params }: LoaderArgs) => {
  const { profileId } = params;
  invariant(profileId, 'Geen profiel gevonden');

  const items = await getItemsByUser({
    id: profileId,
  });

  return json({ items }, {status: 200 });
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useOptionalUser();

  const { items } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <AdminPageLayout>
      <div className="flex flex-col md:flex-row gap-5">
        <nav className="w-full h-screen md:w-1/4 flex-1 p-8 bg-slate-100">
          <ul>
            <li>Geclaimde items</li>
            <li>Naam poule</li>
            <li>Instellingen</li>
          </ul>
        </nav>

        <div className="w-full md:w-3/4 mt-4 md:mt-8 px-8 md:px-0">
          <h1 className="text-2xl lg:text-4xl">Hallo {user!.name}</h1>
          <Outlet />
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default ProfilePage;
