import React from "react";

// Inorder to get the movieId from `react-router-dom `
import { useParams } from "react-router-dom";

// Components

import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actors from "./Actors";
import Grid from './Grid';


// Hook
import { useMovieFetch } from "./hooks/useMovieFetch";

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

// Image
import NoImage from '../images/no_image.jpg';





const Movie = () => {

    const {movieId} = useParams();

    const { state: movie, loading, error } = useMovieFetch(movieId);

    console.log(movie)
    if (loading) return <Spinner/>
    if (error) return <div>Something went wrong... </div>

    return (
        <>
            <BreadCrumb movieTitle={movie.original_title}/>

            <MovieInfo movie={movie} />

            <MovieInfoBar 
                time={movie.runtime} 
                budget={movie.budget} 
                revenue={movie.revenue} 
            />

            <Grid header='Actors'>

                {movie.actors.map(actor => 
                    <Actors 
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={ actor.profile_path 
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` 
                            : NoImage       
                        }
                    />
                )}
                
            </Grid>
        </>
    )
}



export default Movie;



