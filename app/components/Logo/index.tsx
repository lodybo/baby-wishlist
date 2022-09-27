import Icon from '~/components/Icon';

type Props = {
  emblemOnly?: boolean;
};

const Logo = ({ emblemOnly = false }: Props) => (
  <>
    <Icon className="mr-2" name="robot" />
    {!emblemOnly && <span>Aké's wensjes</span>}
  </>
);

export default Logo;
