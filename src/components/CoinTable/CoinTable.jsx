import { fetchCoinData } from '../../Services/fetchCoinData';
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import currencyStore from '../../state/store';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../PageLoader/PageLoader'

function CoinTable() {

  const { currency } = currencyStore();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['coins', page, currency],
    queryFn: () => fetchCoinData(page, currency),
    retry: 3,
    retryDelay: 1000,
    gcTime: 2 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  function handleCoinRedirect(id) {
    navigate(`/details/${id}`);
  }

  if (isError) { return <div className='text-center text-red-500'>Error: {error.message}</div>; }
  if (isLoading) { return <PageLoader /> }

  return (
    <div className='my-5 flex flex-col items-center justify-center gap-5 w-[100vh] mx-auto'>
      <div className='w-full bg-yellow-400 text-black flex py-2 px-4 font-semibold items-center justify-center'>
        {/* header of the table */}
        <div className='basis-[35%]'> Coin </div>
        <div className='basis-[25%]'> price </div>
        <div className='basis-[20%]'> 24h Change </div>
        <div className='basis-[20%]'> Market Cap </div>
      </div>
      {/* table rows */}
      <div className='flex flex-col w-[100vh] mx-auto'>
        {isLoading && <div className='text-center text-white'>Loading...</div>}
        {data && data.map((coin) => (
          <div onClick={() => handleCoinRedirect(coin.id)}
            key={coin.id}
            className='w-full cursor-pointer bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between border-b border-gray-700'
          >

            {/* Coin Info */}
            <div className='basis-[35%] flex items-center justify-start gap-4'>
              <div className='w-[3rem] h-[3rem]'>
                <img src={coin.image} alt={coin.name} className='w-full h-full' loading='lazy' />
              </div>
              <div className='flex flex-col'>
                <div className='text-xl'>{coin.name}</div>
                <div className='text-sm text-gray-400'>{coin.symbol.toUpperCase()}</div>
              </div>
            </div>

            {/* Price */}
            <div className='basis-[25%] text-start'> {currency === 'usd' ? '$' : '₹'}{coin.current_price.toLocaleString()} </div>

            {/* 24h Change */}
            <div className={`basis-[20%] text-start ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-500'}`}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </div>

            {/* Market Cap */}
            <div className='basis-[20%] text-start'>
              {coin.market_cap.toLocaleString()}
            </div>

          </div>
        ))}
      </div>

      <div className='flex gap-5 justify-center items-center'>
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className='btn btn-primary btn-wide text-white text-2xl' > Previous </button>
        <button onClick={() => setPage(page + 1)} className='btn btn-secondary btn-wide text-white text-2xl' > Next </button>
      </div>
    </div>
  );
}

export default CoinTable;