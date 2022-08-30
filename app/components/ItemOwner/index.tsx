import Avatar from '~/components/Avatar';
import Kaylee from '~/images/kaylee.jpg';
import Lody from '~/images/lody.jpeg';

export type Props = {
  name: string;
};

export default function ItemOwner({ name }: Props) {
  return (
    <div className="lg:flexs-row mb-2.5 flex flex-row items-center gap-5 sm:flex-col md:flex-row">
      <Avatar name={name} alt={`Aangevraagd door ${name}`} />

      <p>
        Aangevraagd door <span className="text-xl font-semibold">{name}</span>
      </p>
    </div>
  );
}
