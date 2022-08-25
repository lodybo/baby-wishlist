import sleepingBaby from '~/images/sleeping-baby.jpg';

import HeroParagraph from './HeroParagraph';

const Hero = () => (
  <div className="mx-3 flex flex-col">
    <h1 className="mb-8 text-center text-hero text-slate-700">Hallo Cody*!</h1>

    <img
      className="h-72 lg:h-[50rem] w-full rounded-lg object-cover object-center md:h-5/6"
      src={sleepingBaby}
      alt="Niet-Cody aan het slapen"
    />
    <span className="text-right text-sm italic">*Dit is niet Cody.</span>

    <HeroParagraph>
      Dit najaar maakt Cody** kennis met de wereld, en de wereld kennis met
      Cody. <br />
      We horen van veel mensen dat ze graag iets willen bijdragen hieraan, maar
      ze niet goed weten wat we willen.
    </HeroParagraph>

    <HeroParagraph>En daar willen we jullie bij helpen.</HeroParagraph>

    <HeroParagraph footNote>**Cody is ook niet zijn naam.</HeroParagraph>
  </div>
);

export default Hero;
