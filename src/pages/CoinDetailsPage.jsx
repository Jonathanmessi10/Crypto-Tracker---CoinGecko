import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import PageLoader from '../components/PageLoader/PageLoader';
import CoinInfoContainer from "../components/CoinInfo/CoinInfoContainer";
import useFetchCoin from "../hooks/useFetchCoin";

function CoinDetailsPage() {

    const { coinId } = useParams();

    const {currency,isError,isLoading,coin} = useFetchCoin(coinId);

    if (isLoading) {
        return  <PageLoader /> 
    }

    if (isError) {
        return <Alert message="Error loading Data" type="error" />
    }

    return (
        <div className="flex flex-col md:flex-row">

            <div className="md:w-1/2 w=full flex flex-col items-center mt-6 md:mt-0 border-r-2 border-grey-500">
                <img
                    src={coin?.image?.large} alt={coin?.name}
                    className="h-52 mb-5"
                />

                <h1 className="text-4xl font-bold mb-5">
                    {coin?.name}
                </h1>
                <div className="w-full flex flex-col md:flex-row md:justify-around">
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-green-500">
                            Rank :
                        </h2>
                        <span className="ml-3 text-xl  text-green-500">
                            {coin?.market_cap_rank}
                        </span>
                    </div>
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-green-500">
                            Current Price :
                        </h2>
                        <span className="ml-3 text-xl  text-green-500">
                            {currency === 'usd' ? '$' : '₹'}{coin?.market_data.current_price[currency]}
                        </span>
                    </div>
                </div>
                <p className="w-full px-6 py-4 text-justify ">
                    {parse(coin?.description?.en)}
                </p>


            </div>

            <div className="w-full md:w-3/4 p-2 ">
                <CoinInfoContainer coinId={coinId} />
            </div>

        </div>
    )
}

export default CoinDetailsPage;