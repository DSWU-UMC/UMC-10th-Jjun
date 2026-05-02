import { useState, useEffect } from 'react';
import axios from 'axios';

// 공통 API 설정을 위한 인스턴스 (선택 사항이지만 권장)
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    },
});

export const useCustomFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // URL이 없으면 실행하지 않음
            if (!url) return;

            setIsLoading(true);
            setIsError(false);

            try {
                const response = await api.get<T>(url);
                setData(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]); // url이 바뀌면 자동으로 재호출

    return { data, isLoading, isError };
};