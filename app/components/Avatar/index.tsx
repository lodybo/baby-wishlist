import Kaylee from '~/images/kaylee.jpg';
import Lody from '~/images/lody.jpeg';

export type Props = {
  name: string;
};

export default function Avatar({ name }: Props) {
  return (
    <div className="lg:flexs-row mb-2.5 flex flex-row items-center gap-5 sm:flex-col md:flex-row">
      <img
        className="h-auto w-14 rounded-full"
        src={name === 'Kaylee' ? Kaylee : Lody}
        alt={`Aangevraagd door ${name}`}
      />

      <p className="">
        Aangevraagd door <span className="text-xl font-semibold">{name}</span>
      </p>
    </div>
  );
}
