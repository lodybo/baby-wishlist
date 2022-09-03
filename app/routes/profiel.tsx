import { Outlet } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import Anchor from '~/components/Anchor';

import ProfilePageLayout from '~/layouts/ProfilePage';
import { requireUser } from '~/session.server';
import { useUser } from '~/utils';

export const loader = async ({ request }: LoaderArgs) => {
  await requireUser(request);
  return null;
};

const ProfilePage = () => {
  const user = useUser();

  return (
    <ProfilePageLayout>
      <div className="flex flex-col gap-10 md:flex-row">
        <nav className="w-full flex-1 bg-slate-100 p-8 md:w-1/4">
          <ul className="flex flex-col gap-2.5">
            <li>
              <Anchor to="/profiel">Mijn geclaimde items</Anchor>
            </li>

            <li>
              <Anchor to="instellingen">Instellingen</Anchor>
            </li>

            {user.role === 'ADMIN' && (
              <>
                <li className="mt-5 font-semibold">Admin opties</li>
                <li>
                  <Anchor to="/admin">Items beheren</Anchor>
                </li>

                <li>
                  <Anchor to="/admin/gebruikers">Gebruikers beheren</Anchor>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="w-full px-8 md:w-3/4 md:px-0">
          <Outlet />
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfilePage;
