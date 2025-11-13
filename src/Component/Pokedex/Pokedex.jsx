import PokemonList from "../PokemonLIst/PokemonList.jsx";
import Search from "./../Search/Search.jsx";
import './Pokedex.css';

function Pokedex() {
  return (
    <>
      <div className="pokedex-wrapper">
        <h1 id="pokedex-heading">Pokedex</h1>
        <Search />
      </div>
      <PokemonList />
    </>
  );
}

export default Pokedex;
