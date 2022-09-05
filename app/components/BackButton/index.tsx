import { Link } from '@remix-run/react';
import Button from '~/components/Button';
import Icon from '~/components/Icon';

type Props = {
  to: string;
};

export default function BackButton({ to }: Props) {
  return (
    <Link to={to}>
      <Button>
        <Icon name="arrow-left-long" />
      </Button>
    </Link>
  );
}
