import baby from '~/images/baby-laughing.jpg';

const Hero = () => (
  <div
    className="h-[32rem] flex flex-col items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-exclusion rounded-lg"
    style={{
      backgroundImage: `url("${baby}")`,
    }}
  >
    <h1 className="text-8xl text-slate-700 mb-3">Hallo Cody!</h1>
    <p className="text-2xl text-slate-900 text-center">
      Dit najaar maakt Cody kennis met de wereld, en de wereld kennis met Cody. <br/>
      We horen van veel mensen dat ze graag iets willen bijdragen hieraan, maar ze niet goed weten wat we willen.
    </p>
  </div>
);

export default Hero;
