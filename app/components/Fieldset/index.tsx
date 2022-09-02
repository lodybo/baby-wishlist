import type { ReactNode } from 'react';

type Props = {
  caption: string;
  children: ReactNode;
};

export default function FieldSet({ caption, children }: Props) {
  return (
    <fieldset className="border border-slate-200 p-5">
      <legend className="ml-5 px-2 text-2xl text-slate-300">{caption}</legend>

      {children}
    </fieldset>
  );
}
