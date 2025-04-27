import React from 'react';

const formatToBillion = (numStr) => {
    const num = parseFloat(numStr.replace(/,/g, '')) / 1000000000;
    return num.toFixed(2);
};

const calculatePercentage = (prev, curr) => {
    const prevNum = parseFloat(prev.replace(/,/g, ''));
    const currNum = parseFloat(curr.replace(/,/g, ''));
    const diff = ((currNum - prevNum) / prevNum) * 100;
    return diff.toFixed(2);
};

const VerticalCompare = ({btcCompareData}) => {
    const stages = [
        { data: btcCompareData.btcStage, key: 'btcMarketcap', title: 'BTC Market Cap' },
        { data: btcCompareData.tgeStage, key: 'TgaBalance', title: 'U.S Treasury Balance' },
        { data: btcCompareData.usaStockStage, key: 'StockVol', title: 'USA Stock Volume' },
        { data: btcCompareData.h41Stage, key: 'H41Value', title: 'Federal Reserve Value' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <section className="col-span-full mb-4">
                <h4 className="font-semibold">Comparative Overview of Bitcoin, Stocks, and Financial Markets</h4>
                <p>
                    Each card below provides a detailed view of Bitcoin's market capitalization, the U.S. Treasury's balance, the total volume of the U.S. stock market, and the Federal Reserve's assets. By examining these metrics side-by-side, you can observe their individual trends and relative growth or decline over time.
                </p>
            </section>
            {stages.map((stage, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h4 className="card-title">{stage.title}</h4>
                        <div className="space-y-4">
                            {stage.data.map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center">
                                        <span>{item.time}</span>
                                        <span>{formatToBillion(item[stage.key])}B</span>
                                    </div>
                                    {idx > 0 && (
                                        <div className="text-sm text-center">
                                            <span className={calculatePercentage(stage.data[idx - 1][stage.key], item[stage.key]) > 0 ? 'text-success' : 'text-error'}>
                                                {calculatePercentage(stage.data[idx - 1][stage.key], item[stage.key])}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VerticalCompare;