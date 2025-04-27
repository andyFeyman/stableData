import React from 'react';

const formatToBillion = (numStr) => {
    const num = parseFloat(numStr.replace(/,/g, '')) / 1000000000;
    return num.toFixed(2);
};

const calculatePercentageVsBTC = (btcValue, compareValue) => {
    const btcNum = parseFloat(btcValue.replace(/,/g, ''));
    const compNum = parseFloat(compareValue.replace(/,/g, ''));
    return ((compNum / btcNum) * 100).toFixed(2);
};

const HorizontalCompare = ({btcCompareData}) => {
    const times = btcCompareData.btcStage.map(item => item.time);

    return (
        <div className="space-y-6">
            <section className="mb-4">
                <h4 className="font-semibold">Bitcoin Compared to Key Financial Assets</h4>
                <p>
                    This section offers a horizontal comparison of Bitcoin's market capitalization against several critical financial indicators at different points in time. By comparing Bitcoin's size to the U.S. Treasury's balance, the volume of the U.S. stock market, and the Federal Reserve's value.
                </p>
                <p>
                    The percentage next to each indicator reflects its size relative to Bitcoin's market cap at that specific time. A higher percentage suggests a larger market or asset volume compared to Bitcoin.
                </p>
            </section>
            {times.map((time, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{time}</h2>
                        <div className="stats stats-vertical lg:stats-horizontal shadow">
                            <div className="stat">
                                <div className="stat-title text-sm">BTC Market Cap</div>
                                <div className="stat-value">
                                    {formatToBillion(btcCompareData.btcStage[index].btcMarketcap)}B
                                </div>
                                <div className="stat-desc text-sm">Base (100%)</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title text-sm">U.S Treasury Balance</div>
                                <div className="stat-value">
                                    {formatToBillion(btcCompareData.tgeStage[index].TgaBalance)}B
                                </div>
                                <div className="stat-desc">
                                    <span className="font-bold text-primary text-sm">
                                        {calculatePercentageVsBTC(btcCompareData.btcStage[index].btcMarketcap, btcCompareData.tgeStage[index].TgaBalance)}%
                                    </span>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-title text-sm">USA Stock Vol</div>
                                <div className="stat-value">
                                    {formatToBillion(btcCompareData.usaStockStage[index].StockVol)}B
                                </div>
                                <div className="stat-desc">
                                    <span className="font-bold text-primary text-sm">
                                        {calculatePercentageVsBTC(btcCompareData.btcStage[index].btcMarketcap, btcCompareData.usaStockStage[index].StockVol)}%
                                    </span>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-title text-sm">Federal Reserve Value</div>
                                <div className="stat-value">
                                    {formatToBillion(btcCompareData.h41Stage[index].H41Value)}B
                                </div>
                                <div className="stat-desc">
                                    <span className="font-bold text-primary text-sm">
                                        {calculatePercentageVsBTC(btcCompareData.btcStage[index].btcMarketcap, btcCompareData.h41Stage[index].H41Value)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HorizontalCompare;