import { useState, useEffect } from "react";


// API
import apiSettings from "../../API";




export const useHomeFetch = () => {
    const initialState = {
        pages: 0,
        results: [],
        total_pages: 0,
        total_results: 0

    };

    const [searchTerm, setSearchTerm] = useState('');

    const [state, setState] = useState(initialState);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isLoadingMore, setIsLoadingMore] = useState(false);


    const fetchMovies = async (page, searchTerm="") => {

        try{
            setLoading(true);
            setError(false);

            const movies = await apiSettings.fetchMovies(searchTerm, page);

            setState(prev => ({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] 
                        : [...movies.results]
            }));

        }catch(error){

            setError(true);
        }

        setLoading(false);
    }


    // Initial render and search
    useEffect(() => {
        // setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    // Load More Movies
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false)

    }, [isLoadingMore, state.page, searchTerm]);


    return {
        state, 
        loading, 
        error, 
        searchTerm, 
        setSearchTerm, 
        setIsLoadingMore
    } 

}


