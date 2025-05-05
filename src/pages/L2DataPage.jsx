import React from 'react';
import CCardsList from '../components/CCardsList';
import L1Table from '../components/L1Table';
import { useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

export default function L2DataPage() {
  const data = useLoaderData();

  return (
    <div className="w-full py-6  flex flex-col items-center">
      {/* Parent container for centering */}
      <Helmet>
        <title>chain explorers</title>
        <meta
          name="description"
          content="Track real-time cryptocurrency trading data, including daily volume, TPS (transactions per second), and average fees. Explore blockchain explorer links for in-depth transaction details.  provides instant updates to help you stay on top of the market."
        />
        <meta
          name="keywords"
          content="Cryptocurrency, all chain explorer,blockchain explorer list,Trading Volume, TPS, Fees, Blockchain, Bitcoin, Ethereum, Stablecoin, USDT, USDC, Stocks, Bonds, Market Analysis"
        />
      </Helmet>
      <Suspense fallback={<span className="mx-auto loading loading-spinner loading-xl "></span>}>
        <Await
          resolve={Promise.all([data.l1DailyRespone, data.l2DataRespone])}
          errorElement={<div>Error loading page data!</div>}
        >
          {([l1DailyRespone, l2DataRespone]) => (
            <div className="max-w-screen-xl w-full  px-4">
              {/* Content container */}
              <div className="divider divider-neutral text-xl mt-4  text-center">
                L1 Daily Data
              </div>
              <div className="flex justify-center">
                  <L1Table l1DailyRespone={l1DailyRespone} />
              </div>

              <div className="divider divider-neutral text-xl mt-4  text-center">
                L2 Daily Data
              </div>
              <div className="flex justify-center">
                <CCardsList l2DataRespone={l2DataRespone} />
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
