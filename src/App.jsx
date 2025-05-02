import { useEffect, useState } from 'react'
import useFetchData from './utils/useFetchData'
import Header from './components/Header';
import SearchBar from './components/SearchBox';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import Pagination from './components/Pagination';

function App() {
  const { data, loading, error } = useFetchData('https://pokeapi.co/api/v2/pokemon?limit=150');
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [sortType, setSortType] = useState('id-asc');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  useEffect(() => {
    async function fetchDetails() {
      if (!data?.results) return;
      const promises = data.results.map(poke => fetch(poke.url).then(res => res.json()));
      const details = await Promise.all(promises);
      setPokemonList(details);
      setLoadingDetails(false);
    }
    fetchDetails();
  }, [data]);

  useEffect(() => {
    let list = pokemonList;

    // Sorting
    list = [...list].sort((a, b) => {
      if (sortType === 'id-asc') return a.id - b.id;
      if (sortType === 'id-desc') return b.id - a.id;
      if (sortType === 'name-asc') return a.name.localeCompare(b.name);
      if (sortType === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

    if (searchTerm) {
      list = list.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedType !== 'all') {
      list = list.filter(p => p.types.some(t => t.type.name === selectedType));
    }
    setFilteredList(list);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [pokemonList, searchTerm, selectedType, sortType]);

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPageData = filteredList.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredList.length / postsPerPage);

  if (loading || loadingDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-2xl font-semibold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-2xl text-red-500">Error loading data.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header title="Pokédex Explorer" />
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <TypeFilter value={selectedType} onChange={setSelectedType} />
        <select
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 px-3 py-1 "
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="id-asc">ID ↑</option>
          <option value="id-desc">ID ↓</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentPageData.length > 0 ? (
          currentPageData.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        ) : (
          <div className="col-span-full text-center text-gray-600">No Pokémon found.</div>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;