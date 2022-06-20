const Navigation = () => (
  <nav className="w-screen h-48 bg-slate-100 sticky shadow-md flex flex-row space-between">
    <h1 className="text-lg">Cody's wensjes</h1>

    <ul className="list-style-none">
      <li>
        Lijst
      </li>

      <li>
        Suggesties
      </li>

      <li>
        <span className="rounded bg-slate">Inloggen</span>
      </li>
    </ul>
  </nav>
);

export default Navigation;
