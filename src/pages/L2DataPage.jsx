import React from 'react';
import CCardsList from '../components/CCardsList';
import L1Table from '../components/L1Table';
import { useLoaderData,Await } from 'react-router-dom';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

export default function L2DataPage() {

    const data = useLoaderData();

    return(
        <Suspense fallback={<div>Loading page data...</div>}>
            <Await
                resolve={Promise.all([data.l1DailyRespone, data.l2DataRespone])}
                errorElement={<div>Error loading page data!</div>}
            >
            {([l1DailyRespone,l2DataRespone]) =>(
                <div className="container-fluid">
                    <Helmet>
                        <title>all main chain explorer</title>
                        <meta name="description" content="Track real-time cryptocurrency trading data, including daily volume, TPS (transactions per second), and average fees. Explore blockchain explorer links for in-depth transaction details.  provides instant updates to help you stay on top of the market." />
                        <meta name="keywords" content="Cryptocurrency, all chain explorer,blockchain explorer list,Trading Volume, TPS, Fees, Blockchain, Bitcoin, Ethereum, Stablecoin, USDT, USDC, Stocks, Bonds, Market Analysis" />
                    </Helmet>
                    <div className="divider divider-neutral  text-xl my-4">L1 Daily Data</div>
                    <L1Table l1DailyRespone={l1DailyRespone}/>
                    <div className="divider divider-neutral text-xl my-4">L2 Daily Data</div>
                    <CCardsList l2DataRespone={l2DataRespone}/>
                </div>
            )}
            </Await>
        </Suspense>
    )
}