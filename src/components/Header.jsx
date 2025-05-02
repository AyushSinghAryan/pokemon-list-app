import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center mb-4">
            <Link to="/" className="text-2xl font-bold text-blue-600">Pokémon</Link>
            <nav className="space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/compare" className="text-gray-700 hover:text-blue-600">Compare Pokémon</Link>
                <Link to="/favorites" className="text-gray-700 hover:text-red-500 font-medium">
                    ★ Favorites
                </Link>
            </nav>
        </header>
    );
}

export default Header;
