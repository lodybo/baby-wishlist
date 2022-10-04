import classnames from 'classnames';
import Icon from '~/components/Icon';

type Props = {
  /**
   * Only show the emblem.
   */
  emblemOnly?: boolean;

  /**
   * Show a higher contrast for the emblem (used for gold backgrounds).
   */
  emblemContrast?: boolean;
};

const Logo = ({ emblemOnly = false, emblemContrast = false }: Props) => (
  <span className="group">
    <Icon
      className={classnames('mr-2 transition-colors duration-300', {
        'text-gold-300': !emblemContrast,
        'group-hover:text-gold-400': !emblemContrast,

        'text-cyan-100': emblemContrast,
        'group-hover:text-cyan-200': emblemContrast,
      })}
      name="robot"
    />
    {!emblemOnly && (
      <span className="text-cyan-50 transition-colors duration-300 group-hover:text-cyan-100">
        Aké's wensjes
      </span>
    )}
  </span>
);

export default Logo;
