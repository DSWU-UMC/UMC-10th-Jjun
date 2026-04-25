import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from './types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MovieResponse>(
          'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
          {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmFmYjFlMzU2NTYwMGY0ZmQzYTA2NzkzZDU0MjcwYSIsIm5iZiI6MTc3NTAwNzQ1MS40NDcsInN1YiI6IjY5Y2M3NmRiMmE2MmE5MjZmZjQ4ZWQyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zp49zOmO-mzc0rDf8RuVCuXjL_DeaZoPPSlUAh38yvE`,
            },  
          }
        );
        setMovies(data.results);
      } catch (error) {
        console.error('영화 데이터 조회 실패', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;