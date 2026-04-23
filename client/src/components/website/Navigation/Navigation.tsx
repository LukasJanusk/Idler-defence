import { NavLink } from 'react-router';

export function Navigation() {
  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-medieval-stoneLight' : 'text-medieval-parchment';
  return (
    <nav className="ml-4 flex gap-4 text-lg">
      <NavLink to="/" end className={activeStyle}>
        Home
      </NavLink>
      <NavLink to="/game" end className={activeStyle}>
        Play
      </NavLink>
    </nav>
  );
}
