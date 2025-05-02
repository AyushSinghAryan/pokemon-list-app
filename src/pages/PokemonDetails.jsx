import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorite } from '../utils/useFavorite';

function PokemonDetail() {
    const { name } = useParams();
    const { favorites, toggleFavorite } = useFavorite();
    const [pokemon, setPokemon] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchPokemonDetails() {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await res.json();
                setPokemon(data);

                const speciesRes = await fetch(data.species.url);
                const speciesData = await speciesRes.json();

                const evoRes = await fetch(speciesData.evolution_chain.url);
                const evoData = await evoRes.json();

                const chain = [];
                let current = evoData.chain;
                while (current) {
                    chain.push(current.species.name);
                    current = current.evolves_to[0];
                }
                setEvolutionChain(chain);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        fetchPokemonDetails();
    }, [name]);

    const isFavorited = (name) => favorites.includes(name);

    if (loading) return <div className="text-center mt-10 text-xl text-sky-700">Loading...</div>;
    if (!pokemon) return <div className="text-center mt-10 text-red-500">Failed to load Pokémon.</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-white to-sky-100 shadow-2xl rounded-2xl mt-10 relative">
            <Link to="/" className="text-sky-600 hover:underline mb-6 inline-block text-lg">← Back to List</Link>

            {message && (
                <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-sm">
                    {message}
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center gap-8 relative">
                <button
                    onClick={() => {
                        toggleFavorite(pokemon.name);
                        setMessage(isFavorited(pokemon.name) ? 'Removed from favorites.' : 'Added to favorites!');
                        setTimeout(() => setMessage(""), 2000);
                    }}
                    className="absolute top-4 right-4 text-sm bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full shadow hover:bg-yellow-200 transition"
                >
                    {isFavorited(pokemon.name) ? '★ Remove Favorite' : '★ Add to Favorites'}
                </button>

                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-44 h-44 object-contain"
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold capitalize text-sky-800">
                        {pokemon.name}
                        <span className="text-gray-500 text-xl ml-2">#{pokemon.id}</span>
                    </h1>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2 text-sky-700">Types</h2>
                        <div className="flex gap-3 flex-wrap">
                            {pokemon.types.map(t => (
                                <span
                                    key={t.type.name}
                                    className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize"
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-sky-700">Stats</h2>
                    <ul className="space-y-2">
                        {pokemon.stats.map(stat => (
                            <li
                                key={stat.stat.name}
                                className="flex justify-between px-4 py-2 bg-sky-50 text-sky-800 rounded"
                            >
                                <span className="capitalize">{stat.stat.name}</span>
                                <span className="font-semibold">{stat.base_stat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3 text-sky-700">Abilities</h2>
                    <ul className="space-y-2">
                        {pokemon.abilities.map(ab => (
                            <li
                                key={ab.ability.name}
                                className="capitalize px-4 py-2 bg-indigo-50 text-indigo-800 rounded"
                            >
                                {ab.ability.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3 text-sky-700">Evolution Chain</h2>
                <div className="flex gap-4 flex-wrap">
                    {evolutionChain.map(name => (
                        <span
                            key={name}
                            className="px-4 py-2 bg-green-100 text-green-800 rounded-full capitalize text-sm"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
