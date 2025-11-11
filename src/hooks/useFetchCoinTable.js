import currencyStore from '../state/store';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinData } from '../Services/fetchCoinData';
import { useState } from 'react';

function useFetchCoinTable() {
    const { currency } = currencyStore();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['coins', page, currency],
        queryFn: () => fetchCoinData(page, currency),
        retry: 3,
        retryDelay: 1000,
        gcTime: 2 * 60 * 1000,
        staleTime: 2 * 60 * 1000,
    });
    return {
        currency,
        navigate,
        setPage,
        data,
        isLoading,
        isError,
        error,
        page
    }

}

export default useFetchCoinTable;