import BannerImage from '../../assets/banner2.jpeg';

function Banner() {
    return (
        <div className='w-full h-[25rem] relative '>
            <img src={BannerImage} alt="Banner" className="w-full h-full object-cover" />

            <div className='absolute top-20 left-0 right-0 mx-auto w-[20rem]'>
                <div className='flex flex-col gap-4'>
                    <div className='font-semi-bold text-5xl text-white'>
                        Crypto Tracker
                    </div>
                    <div className='text-white font-semibold text-sm text-center'>
                        Get all the info regarding your favorite cryptocurrencies
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Banner;