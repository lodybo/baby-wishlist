import { Link } from '@remix-run/react';

export type Props = {
  tag: string;
};

export default function Tag({ tag }: Props) {
  return (
    <li className="w-fit cursor-pointer rounded-xl bg-cyan-700 px-2.5 py-1 text-xs text-cyan-50 transition hover:bg-cyan-600">
      <Link className="no-underline" to={`/lijst/${tag}`}>
        {tag}
      </Link>
    </li>
  );
}
