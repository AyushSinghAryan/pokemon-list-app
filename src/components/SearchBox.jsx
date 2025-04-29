import React from 'react';

export default function SearchBar({ value, onChange }) {
    return (
        <input
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            type="text"
            placeholder="Search Pokémon..."
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    );
}
