import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

export interface IAppProps {}

export const Navbar = () => {
  const [search, setSearch] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav id='navbar'>
      <h2>
        <Link to='/'>Personagens Marvel</Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>
    </nav>
  );
};
