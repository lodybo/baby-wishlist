import { Outlet } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import Anchor from '~/components/Anchor';
import ProfileMenu from '~/components/ProfileMenu';

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
        <ProfileMenu role={user.role} />

        <div className="w-full px-8 md:w-3/4 md:px-0">
          <Outlet />
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfilePage;
