import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCustomFetch } from '../hooks/useCustomFetch';
import type { MovieDetail, Credits } from '../types/movie';

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();

    // 커스텀 훅 사용: 영화 상세 및 출연진 정보
    const { data: movie, isLoading: isMovieLoading, isError: isMovieError } =
        useCustomFetch<MovieDetail>(`/movie/${movieId}?language=ko-KR`);

    const { data: credits, isLoading: isCreditsLoading } =
        useCustomFetch<Credits>(`/movie/${movieId}/credits?language=ko-KR`);

    if (isMovieLoading || isCreditsLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <LoadingSpinner />
            </div>
        );
    }

    if (isMovieError || !movie) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-red-500">
                에러가 발생했습니다
            </div>
        );
    }

    const director = credits?.crew.find((c) => c.job === 'Director');

    return (
        <div className="bg-black text-white min-h-screen">
            {/* 상단 히어로 섹션 */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg">{movie.title}</h1>

                    <div className="flex items-center gap-4 text-lg mb-6">
                        <span className="text-yellow-400 font-bold">평점 ⭐ {movie.vote_average.toFixed(1)}</span>
                        <span className="text-gray-300">{movie.release_date.split('-')[0]}</span>
                        <span className="border border-gray-500 px-2 py-0.5 text-xs rounded text-gray-400">4K Ultra HD</span>
                    </div>

                    <p className="text-xl text-gray-200 line-clamp-3 mb-8 leading-relaxed max-w-2xl">
                        {movie.overview || "상세 설명이 없습니다."}
                    </p>

                    <div className="flex gap-3">
                        <button className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition">▶ 재생</button>
                        <button className="bg-gray-500/50 backdrop-blur-md text-white px-8 py-3 rounded font-bold hover:bg-gray-500/80 transition">상세 정보</button>
                    </div>
                </div>
            </div>

            {/* 상세 정보 섹션 */}
            <div className="px-12 md:px-20 py-12 grid md:grid-cols-4 gap-12">
                <div className="md:col-span-3">
                    <h2 className="text-2xl font-bold mb-8 border-l-4 border-[#b2dab1] pl-4">주요 출연진</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                        {credits?.cast.slice(0, 6).map((actor) => (
                            <div key={actor.id} className="group cursor-pointer">
                                <div className="overflow-hidden rounded-lg mb-2">
                                    <img
                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300'}
                                        className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-110"
                                        alt={actor.name}
                                    />
                                </div>
                                <p className="font-bold text-sm">{actor.name}</p>
                                <p className="text-xs text-gray-400">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 bg-white/5 p-6 rounded-xl h-fit">
                    <div>
                        <h3 className="text-gray-400 text-sm mb-1">감독</h3>
                        <p className="font-medium text-[#b2dab1]">{director?.name || '정보 없음'}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-400 text-sm mb-1">장르</h3>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map(g => <span key={g.id} className="text-sm">{g.name}</span>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-400 text-sm mb-1">상영 시간</h3>
                        <p className="text-sm">{movie.runtime}분</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;