export default function HomePage() {
    return (
        <div>
            <div className="hero bg-base-200 h-100 ">
                <div className="hero-content text-center ">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            What kind of data we should know?
                        </p>
                    </div>
                </div>
            </div>
            <div className="hero bg-base-200 min-h-100">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src="/BTC4Years.png"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">What is bitcoin 4 year cycle?</h1>
                        <p className="py-6 ">
                        Explore Bitcoin's 4-year halving cycle, historical all-time highs (ATH), 
                        and the countdown to the next cycle. 
                        </p>
                        <a href="/btc4years"><button className="btn btn-primary"> Detail</button></a>
                    </div>
                </div>
            </div>
            <div className="hero bg-base-200  min-h-100 ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="/bitcoinCompare.png"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Bitcoin VS U.S Assets</h1>
                        <p className="py-6">
                        Compare Bitcoin to the stock market and other key indicators to understand how big Bitcoin is.
                        </p>
                        <a href="/btcCompare"><button className="btn btn-primary">Detail</button></a>
                    </div>
                </div>
            </div>
            <div className="hero bg-base-200 min-h-100 ">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src="/blockchainExplorer.png"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Blockchain Explorers</h1>
                        <p className="py-6">
                        Review the daily volume, TPS (transactions per second), and average fees of the main cryptocurrencies.
                        </p>
                        <a href="/chainExplorers"><button className="btn btn-primary">Detail</button></a>
                    </div>
                </div>
            </div>
            <div className="hero bg-base-200  min-h-100 ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="/stablecoin.png"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Stablecoin ATH </h1>
                        <p className="py-6">
                        Analyze stablecoin market data,stablecoin comparison, track daily volume, historical highs
                        </p>
                        <a href="/stablecoin"><button className="btn btn-primary">Detail</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}