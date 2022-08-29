import type { ReactNode } from 'react';
import { Link } from '@remix-run/react';
import Icon from '~/components/Icon';
import classNames from 'classnames';

type Props = {
  /**
   * The actual tag.
   */
  tag?: string;

  /**
   * Whether the tag is editable so:
   * 1. It can be deleted.
   * 2. It doesn't link to a tag page.
   */
  isEditable?: boolean;

  /**
   * Handler for a delete action.
   */
  onDelete?: (selectedTag: string) => void;
};

type WrapperProps = Props & {
  children: ReactNode;
};


export default function Tag({ tag, isEditable, onDelete }: Props) {
  return (
    <li className={classNames(
      'w-fit rounded-xl bg-cyan-700 px-2.5 py-1 text-xs text-cyan-50 transition hover:bg-cyan-600',
      {
        'cursor-pointer': !isEditable,
      }
    )}>
      <Wrapper isEditable={isEditable} tag={tag} onDelete={onDelete}>
        {tag}
      </Wrapper>
    </li>
  );
}

const Wrapper = ({ isEditable, tag, children, onDelete }: WrapperProps) => {
  // TODO: Use discriminating unions to force this.
  if (isEditable && !onDelete) {
    throw new Error('When a tag is editable, a delete handler must be defined.');
  }

  if (isEditable) {
    return (
      <span>
        { children }

        <button className="ml-2.5 cursor-pointer" onClick={() => onDelete!(tag!)}>
          <Icon name="remove" />
        </button>
      </span>
    );
  }

  return (
    <Link className="no-underline" to={`/lijst/${tag}`}>
      { children }
    </Link>
  );
};
