import { useState } from 'react';
import { Helmet } from "react-helmet";
import { useLoaderData } from 'react-router-dom';

import BtcCompareComponent from '../components/BtcCompare/BtcCompare';

function BtcComparePage() {


    return (
        <div className="w-full flex flex-col items-center">
            <Helmet>
                {/* Optimized Title */}
                <title>Bitcoin Compared to Stock Market: Performance & Trends | ChainMonitor</title>
                {/* Optimized Meta Description */}
                <meta
                    name="description"
                    content="Explore how Bitcoin's market performance compares to the stock market. Analyze historical trends, market capitalization, and other key indicators to understand the relationship between BTC and stocks."
                />
                {/* Optimized Meta Keywords (use relevant keywords, remove less relevant ones) */}
                <meta
                    name="keywords"
                    content="bitcoin, stock market, BTC vs stocks, bitcoin market performance, bitcoin and stock correlation, cryptocurrency, investment, market cap, historical trends, bitcoin compared to stock market"
                />
            </Helmet>
            {/* Add H1 to guide content */}
            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Bitcoin vs Stock Market / U.S Treasury / Federal Reserve</h1>


            <BtcCompareComponent /> 
  

        </div>
    );
}

export default BtcComparePage;
