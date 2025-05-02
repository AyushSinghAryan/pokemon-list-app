import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavortiesContext.jsx'; // ✅ Make sure path is correct

function FavoritesPage() {
    const { favorites, removeFavorite } = useFavorites();
    const [favoriteDetails, setFavoriteDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const data = await Promise.all(
                    favorites.map(name =>
                        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json())
                    )
                );
                setFavoriteDetails(data);
            } catch (err) {
                console.error("Failed to fetch favorites", err);
            } finally {
                setLoading(false);
            }
        }

        if (favorites.length > 0) fetchFavorites();
        else setLoading(false);
    }, [favorites]);

    if (loading) return <div className="text-center mt-10">Loading favorites...</div>;
    if (favorites.length === 0) return <div className="text-center mt-10 text-gray-500">No favorites yet.</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Home</Link>
            <h1 className="text-3xl font-bold mb-6">Favorite Pokémon</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {favoriteDetails.map(pokemon => (
                    <div key={pokemon.id} className="bg-white shadow-md p-4 rounded-lg text-center hover:shadow-lg">
                        <Link to={`/pokemon/${pokemon.name}`}>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 mx-auto mb-2" />
                            <h2 className="capitalize font-semibold text-lg">{pokemon.name}</h2>
                            <p className="text-sm text-gray-500">#{pokemon.id}</p>
                        </Link>
                        <button
                            onClick={() => removeFavorite(pokemon.name)}
                            className="mt-2 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full"
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;
