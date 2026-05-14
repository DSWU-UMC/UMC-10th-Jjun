import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCustomFetch } from '../hooks/useCustomFetch';
import type { MovieResponse } from '../types/movie';

export default function MoviePage() {
    const [page, setPage] = useState(1);
    const { category } = useParams<{ category: string }>();

    // 커스텀 훅 적용
    const { data, isLoading, isError } = useCustomFetch<MovieResponse>(
        `/movie/${category}?language=ko-KR&page=${page}`
    );

    if (isError) {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
                <p className='text-2xl font-bold text-red-500'>⚠️ 영화 정보를 가져오는데 실패했습니다.</p>
                <button onClick={() => window.location.reload()} className="mt-4 underline">다시 시도</button>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen pb-10">
            {/* 페이지네이션 UI */}
            <div className='flex items-center justify-center gap-6 py-8'>
                <button
                    className='bg-white/10 text-white px-5 py-2 rounded-full border border-white/20 hover:bg-[#b2dab1] hover:text-black transition-all disabled:opacity-30'
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}>
                    이전
                </button>
                <span className='text-white font-medium'>{page} 페이지</span>
                <button
                    className='bg-white/10 text-white px-5 py-2 rounded-full border border-white/20 hover:bg-[#b2dab1] hover:text-black transition-all'
                    onClick={() => setPage(prev => prev + 1)}>
                    다음
                </button>
            </div>

            {isLoading ? (
                <div className='flex items-center justify-center h-[50vh]'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='px-6 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
                    {data?.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}