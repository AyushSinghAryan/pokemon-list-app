import { useEffect, useState } from 'react'
import useFetchData from './utils/useFetchData'
import Header from './components/Header';
import SearchBar from './components/SearchBox';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
function App() {
  const { data, error, loading } = useFetchData("https://pokeapi.co/api/v2/pokemon?limit=150");
  const [pokemonList, setpokemonList] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   async function fetchPokemonDetails() {
  //     if (data?.results) {
  //       const detailsPromises = data.results.map(async (pokemon) => {
  //         const res = await fetch(pokemon.url);
  //         const detail = await res.json();

  //         const allPokemonDetails = await Promise.all(detail);
  //         setpokemonList(allPokemonDetails);
  //         setLoadingDetails(false);
  //       });


  //     }
  //   }

  //   fetchPokemonDetails();
  // }, [data]);


  useEffect(() => {
    async function fetchDetails() {
      if (!data?.results) return;
      const promises = data.results.map(poke => fetch(poke.url).then(res => res.json()));
      const details = await Promise.all(promises);
      setpokemonList(details);
      setLoadingDetails(false);
    }
    fetchDetails();
  }, [data]);

  useEffect(() => {
    let list = pokemonList;
    if (searchTerm) {
      list = list.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedType !== 'all') {
      list = list.filter(p => p.types.some(t => t.type.name === selectedType));
    }
    console.log("list", list)
    setFilteredList(list);
  }, [pokemonList, searchTerm, selectedType]);

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
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <Header title="Pokémon Explorer" />
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <TypeFilter value={selectedType} onChange={setSelectedType} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredList.length > 0 ? (
            filteredList.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
          ) : (
            <div className="col-span-full text-center text-gray-600">No Pokémon found.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default App;
