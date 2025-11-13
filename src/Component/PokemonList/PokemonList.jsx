import { React, useEffect, useState} from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon.jsx";

function PokemonList() {

    const [pokemonList, setPokemonList]=useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon';



    async function pokemons(){
            const response=await axios.get(POKEDEX_URL);  //downloads list of 20 pokemons

            const pokemonResult=response.data.results;  //array of 20 pokemons from results

            //iterating over array of pokemons , and using their urls, to create an array of promises
            //that will download that 20 pokemons
            const pokemonResultPromise=pokemonResult.map((pokemon)=>axios.get(pokemon.url));

            //passing the promise array to axios.all
            const pokemonData=await axios.all(pokemonResultPromise);  //array of 20 pokemons detailed data

            // console.log(pokemonData);

            //iterate on the data of each pokemon and extract id, name, image and types
            const pokeListResult=pokemonData.map((pokedata)=>{ 
              const pokemon=pokedata.data;
              return {
                id : pokemon.id,
                name : pokemon.name, 
                image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types : pokemon.types
              }
            });

             console.log(pokeListResult);

        setPokemonList(pokeListResult);
        setIsLoading(false);
    };

  useEffect(()=>{
        pokemons();
    },[])

  return (
    <div className="pokemon-list-wrapper">
      <div>Pokemon List</div>
      {(isLoading) ? "Loading...." : pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} />)
      }
    </div>
  );
}

export default PokemonList;
