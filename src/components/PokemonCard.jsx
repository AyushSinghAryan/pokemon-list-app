import React from 'react';

export default function PokemonCard({ pokemon }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 transform transition">
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-24 h-24 mb-2"
            />
            <h2 className="text-xl font-medium capitalize">{pokemon.name}</h2>
            <p className="text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                {pokemon.types.map(t => (
                    <span
                        key={t.slot}
                        className="px-2 py-1 text-sm rounded-full bg-gray-200 capitalize"
                    >
                        {t.type.name}
                    </span>
                ))}
            </div>
        </div>
    )
}