import { useFavorites } from "../contexts/FavortiesContext.jsx";

export const useFavorite = () => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const toggleFavorite = (pokemonName) => {
        if (favorites.includes(pokemonName)) {
            removeFavorite(pokemonName);
        } else {
            addFavorite(pokemonName);
        }
    };

    return { favorites, toggleFavorite };
};
