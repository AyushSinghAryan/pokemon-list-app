import React, { useState, useEffect } from 'react';

function ComparisonTool() {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);
    const [selectedPokemon1, setSelectedPokemon1] = useState('');
    const [selectedPokemon2, setSelectedPokemon2] = useState('');

    const fetchPokemonList = async () => {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const data = await res.json();
            setPokemonList(data.results);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPokemonDetails = async (name) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPokemonList();
    }, []);

    useEffect(() => {
        if (selectedPokemon1) {
            fetchPokemonDetails(selectedPokemon1).then(setPokemon1);
        }
        if (selectedPokemon2) {
            fetchPokemonDetails(selectedPokemon2).then(setPokemon2);
        }
    }, [selectedPokemon1, selectedPokemon2]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-white to-sky-100 shadow-2xl rounded-2xl mt-10">
            <h2 className="text-4xl font-extrabold mb-8 text-center text-sky-800">Compare Pokémon</h2>

            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
                {[1, 2].map((index) => (
                    <select
                        key={index}
                        value={index === 1 ? selectedPokemon1 : selectedPokemon2}
                        onChange={(e) =>
                            index === 1 ? setSelectedPokemon1(e.target.value) : setSelectedPokemon2(e.target.value)
                        }
                        className="p-3 rounded-lg border-2 border-sky-400 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg"
                    >
                        <option value="">Select Pokémon {index}</option>
                        {pokemonList.map((p) => (
                            <option key={p.name} value={p.name}>
                                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                            </option>
                        ))}
                    </select>
                ))}
            </div>

            {pokemon1 && pokemon2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[pokemon1, pokemon2].map((poke, idx) => (
                        <div
                            key={poke.name}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all"
                        >
                            <h3 className="text-2xl font-bold capitalize text-center mb-4 text-sky-700">
                                {poke.name}
                            </h3>
                            <img
                                src={poke.sprites.front_default}
                                alt={poke.name}
                                className="mx-auto w-32 h-32"
                            />
                            <ul className="mt-6 space-y-2">
                                {poke.stats.map((stat) => (
                                    <li
                                        key={stat.stat.name}
                                        className="flex justify-between px-4 py-2 bg-sky-50 rounded text-sky-800 font-medium"
                                    >
                                        <span>{stat.stat.name}</span>
                                        <span>{stat.base_stat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ComparisonTool;
