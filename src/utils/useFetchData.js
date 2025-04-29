import { useEffect, useState } from "react";

function useFetchData(url) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [url])

    return { data, error, loading };
}

export default useFetchData;