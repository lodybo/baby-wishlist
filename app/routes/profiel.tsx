import { json, MetaDescriptor } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import ProfileMenu from '~/components/ProfileMenu';

import ProfilePageLayout from '~/layouts/ProfilePage';
import { requireUser } from '~/session.server';
import { useUser } from '~/utils';

export const meta: MetaFunction = ({ data }) => {
  const genericMeta: MetaDescriptor = {
    'theme-color': '#697e69',
  };

  if (!data) {
    return {
      title: 'Akés wensjes',
      ...genericMeta,
    };
  }

  return {
    title: `${data.name}'s profiel`,
    ...genericMeta,
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
