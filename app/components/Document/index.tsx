import type { ReactNode } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

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
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload port={4200} />
      </body>
    </html>
  );
}
