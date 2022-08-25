import { Link } from '@remix-run/react';
import Logo from '~/components/Logo';

const Footer = () => (
  <footer className="mt-8 flex h-24 w-full flex-row items-center justify-center bg-slate-100 p-5 shadow-sm">
    <h1 className="text-xl">
      <Link to="/">
        <Logo />
      </Link>
    </h1>
  </footer>
);

export default Footer;
