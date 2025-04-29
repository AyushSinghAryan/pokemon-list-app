import { useEffect, useState } from "react";
import useFetchData from "../utils/useFetchData";

function TypeFilter({ value, onChange }) {

    const { data } = useFetchData("https://pokeapi.co/api/v2/type");
    const [types, setTypes] = useState([]);

    useEffect(() => {
        if (data?.results) {
            setTypes(data.results.map(t => t.name));
        }
    }, [data])
    return (
        <>
            <select
                className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"

                value={value}
                onChange={(e) => onChange(e.target.value)}>
                <option value="all">All Types</option>
                {types.map((type) => {

                    return <option key={type} value={type} className="capitalize">{type}</option>
                })}
            </select>

        </>
    )
}

export default TypeFilter;