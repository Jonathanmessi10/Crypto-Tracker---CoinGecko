import { useEffect } from 'react';

function CoinTable() {

    async function download(){
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        console.log(data);
    }
    useEffect(() => { download(); }, []);

    return (
        <>
            <h1>Coin Table</h1>
        </>
    );
}

export default CoinTable;