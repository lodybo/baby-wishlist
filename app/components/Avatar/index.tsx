import Kaylee from '~/images/kaylee.jpg';
import Lody from '~/images/lody.jpeg';

export type Props = {
  name: string;
  alt: string;
};

export default function Avatar({ name, alt }: Props) {
  return (
    <img
      className="h-auto w-14 aspect-square object-cover rounded-full"
      src={name === 'Kaylee' ? Kaylee : Lody}
      alt={alt}
    />
  );
}
