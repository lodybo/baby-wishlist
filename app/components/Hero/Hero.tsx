import sleepingBaby from '~/images/sleeping-baby.jpg';

import HeroParagraph from './HeroParagraph';

const Hero = () => (
  <div
    className="mx-3 h-[40rem] flex flex-col"
  >
    <h1 className="mb-8 text-8xl text-slate-700 text-center">Hallo Cody*!</h1>

    <img className="h-full w-full object-cover object-center rounded-lg" src={sleepingBaby} alt="Niet-Cody aan het slapen" />
    <span className="text-right text-sm italic">*Dit is niet Cody.</span>

    <HeroParagraph>
      Dit najaar maakt Cody** kennis met de wereld, en de wereld kennis met Cody. <br/>
      We horen van veel mensen dat ze graag iets willen bijdragen hieraan, maar ze niet goed weten wat we willen.
    </HeroParagraph>

    <HeroParagraph>
      En daar willen we jullie bij helpen.
    </HeroParagraph>

    <HeroParagraph footNote>
      **Cody is ook niet zijn naam.
    </HeroParagraph>
  </div>
);

export default Hero;
