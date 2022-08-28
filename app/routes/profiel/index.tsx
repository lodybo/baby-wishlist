import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useOptionalUser } from '~/utils';

const ProfileIndexPage = () => {
  const navigate = useNavigate();
  const user = useOptionalUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    navigate(`/profiel/${user!.id}`, {
      replace: true,
    });
  }, [user, navigate]);

  return null;
};

export default ProfileIndexPage;
