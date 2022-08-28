import { useUser } from '~/utils';

const ProfileIndexPage = () => {
  const user = useUser();

  return (
    <h1 className="text-2xl lg:text-4xl">Hallo {user!.name}</h1>
  );
};

export default ProfileIndexPage;
