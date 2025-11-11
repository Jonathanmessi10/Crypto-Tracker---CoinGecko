import currencyStore from '../state/store';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinDetails } from '../Services/fetchCoinDetails';

function useFetchCoin(coinId) {

    const { currency } = currencyStore();

    const { isError, isLoading, data: coin } = useQuery({
        queryKey: ['coins', coinId],
        queryFn: () => fetchCoinDetails(coinId),
        retry: 1,
        retryDelay: 1000,
        gcTime: 2 * 60 * 1000,
        staleTime: 2 * 60 * 1000,
    })

    return {
        currency,
        isError,
        isLoading,
        coin,
    }
}

export default useFetchCoin;