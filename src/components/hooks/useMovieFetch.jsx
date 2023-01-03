import { useState, useEffect } from "react";

// API
import apiSettings from "../../API";




export const useMovieFetch = movieId => {
    const [state, setState ] = useState({});
    const [error,  setError] = useState(true);
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try{

                setLoading(true);
                setError(false);

                const movie = await apiSettings.fetchMovie(movieId);
                const credits = await apiSettings.fetchCredits(movieId);

                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    ...movie, 
                    actors: credits.cast,
                    directors
                });

                setLoading(false);

            }catch(error){
                setError(true)
            }
        }

        fetchMovie();
    }, [movieId])


    return { state, loading, error }

}



