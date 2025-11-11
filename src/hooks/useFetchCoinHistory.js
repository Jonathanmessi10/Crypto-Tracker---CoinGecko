import { useQuery } from '@tanstack/react-query';
import currencyStore from '../state/store';
import { fetchCoinHistoricData } from '../Services/fetchCoinHistoricData';
import { useState } from 'react';

function useFetchCoinHistory(coinId) {
    const { currency } = currencyStore();
    const [days, setDays] = useState(1);
    const [interval, setCoinInterval] = useState('');

    const { data: historicData, isLoading, isError } = useQuery({
        queryKey: ['coinHistoricData', coinId, currency, days, interval],
        queryFn: () => fetchCoinHistoricData(coinId, interval, days, currency),
        gcTime: 2 * 60 * 1000,
        staleTime: 2 * 60 * 1000,
    })

    return {
        historicData,
        isLoading,
        isError,
        setDays,
        setCoinInterval,
        days,
        currency,
    };
}

export default useFetchCoinHistory;