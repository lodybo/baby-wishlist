import { Outlet, Link } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';

import ProfilePageLayout from '~/layouts/ProfilePage';
import { requireUser } from '~/session.server';
import { useUser } from '~/utils';

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUser(request);
  return null;
};

const ProfilePage = () => {
  const user = useUser();

  return (
    <ProfilePageLayout>
      <div className="flex flex-col md:flex-row gap-5">
        <nav className="w-full h-screen md:w-1/4 flex-1 p-8 bg-slate-100">
          <ul>
            { user.role === 'ADMIN' && (
              <li>
                <Link to="/admin">
                  Items bewerken
                </Link>
              </li>
            )}

            <li>Geclaimde items</li>
            <li>Instellingen</li>
          </ul>
        </nav>

        <div className="w-full md:w-3/4 mt-4 md:mt-8 px-8 md:px-0">

          <Outlet />
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfilePage;
