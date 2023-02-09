import type { ReactNode } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import Footer from '~/components/Footer';
import Navigation from '~/components/Navigation';

type Props = {
  children: ReactNode;
};

export default function Document({ children }: Props) {
  return (
    <html lang="en" className="h-full bg-cyan-50 font-serif">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Navigation />
        <div className="mx-auto mt-5 w-5/6">{children}</div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload port={4200} />
      </body>
    </html>
  );
}
