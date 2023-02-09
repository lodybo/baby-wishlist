import sleepingBaby from '~/images/sleeping-baby.jpg';

import HeroParagraph from 'app/components/HeroParagraph';

const Hero = () => (
  <div className="mx-3 flex flex-col">
    <h1 className="mb-8 text-center text-hero text-slate-700">Hallo Aké*!</h1>

    <img
      className="h-72 w-full rounded-lg object-cover object-center md:h-5/6 lg:h-[50rem]"
      src={sleepingBaby}
      alt="Niet-Aké aan het slapen"
    />
    <span className="text-right text-sm italic">*Dit is niet Aké.</span>

    <HeroParagraph>
      Dit najaar maakt Aké kennis met de wereld, en de wereld kennis met Aké.{' '}
      <br />
      We horen van veel mensen dat ze graag iets willen bijdragen hieraan, maar
      ze niet goed weten wat we willen.
    </HeroParagraph>

    <HeroParagraph>En daar willen we jullie bij helpen.</HeroParagraph>
  </div>
);

export default Hero;
