import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import ProfileMenu from '~/components/ProfileMenu';

import ProfilePageLayout from '~/layouts/ProfilePage';
import { requireUser } from '~/session.server';
import { useUser } from '~/utils';

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: "Aké's wensjes",
    };
  }

  return {
    title: `${data.name}'s profiel`,
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  return json({ name: user.name });
};

const ProfilePage = () => {
  const user = useUser();

  return (
    <ProfilePageLayout>
      <div className="flex flex-col gap-10 md:flex-row">
        <ProfileMenu role={user.role} theme="lime" />

        <div className="w-full md:w-3/4">
          <Outlet />
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfilePage;
