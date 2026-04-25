import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { MovieDetail, Credits } from '../types/movie';

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const [movieRes, creditRes] = await Promise.all([
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                ]);

                setMovie(movieRes.data);
                setCredits(creditRes.data);
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [movieId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-dvh bg-black">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !movie) {
        return (
            <div className="text-red-500 text-center mt-10 bg-black min-h-screen">
                에러가 발생했습니다 😢
            </div>
        );
    }

    const director = credits?.crew.find((c) => c.job === 'Director');

    return (
        <div className="bg-black text-white min-h-screen">

            {/* 배경 */}
            <div
                className="h-[500px] bg-cover bg-center relative"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 bg-black/70" />

                <div className="absolute bottom-10 left-10 flex gap-8">
                    {/* 포스터 */}
                    <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        className="rounded-xl shadow-xl"
                        alt={movie.title}
                    />

                    {/* 정보 */}
                    <div className="max-w-xl">
                        <h1 className="text-4xl font-bold">{movie.title}</h1>

                        {movie.tagline && (
                            <p className="text-gray-400 mt-2 italic">
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="mt-4 flex gap-4 text-sm text-gray-300 flex-wrap">
                            <span>⭐ {movie.vote_average.toFixed(1)}</span>
                            <span>📅 {movie.release_date}</span>
                            <span>⏱ {movie.runtime}분</span>
                        </div>

                        {/* 장르 */}
                        <div className="mt-3 flex gap-2 flex-wrap">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="bg-gray-700 px-2 py-1 rounded text-xs"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {director && (
                            <p className="mt-2 text-sm text-gray-400">
                                🎬 감독: {director.name}
                            </p>
                        )}

                        <p className="mt-4 text-gray-300 leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>

            {/* 출연진 */}
            <div className="p-10">
                <h2 className="text-2xl font-bold mb-6">출연진</h2>

                <div className="flex gap-4 overflow-x-auto">
                    {credits?.cast.slice(0, 12).map((actor) => (
                        <div key={actor.id} className="min-w-[120px]">
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : 'https://via.placeholder.com/200x300?text=No+Image'
                                }
                                className="rounded-lg"
                                alt={actor.name}
                            />
                            <p className="text-sm mt-2">{actor.name}</p>
                            <p className="text-xs text-gray-400">
                                {actor.character}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;