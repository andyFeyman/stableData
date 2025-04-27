import { React, useContext, useEffect, useState } from 'react';
import { useLoaderData,useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import VerticalCompare from './VerticalCompare';
import HorizontalCompare from './HorizontalCompare';
import MultiAxisLineChart from './MultiAxisLineChart';
import btcCompareData from '../../data/btcCompareData.js';



const BtcCompare = () => {

    const { currentUser } = useContext(AuthContext);
    const [latestData, setLatestData] = useState();
    const location = useLocation();
    const latest = useLoaderData();

    const loginRedirectPath = `/login?redirect=${encodeURIComponent(location.pathname)}`;


    useEffect(() => {
        const processPromise = async () => {

            try {
                if (currentUser && latest.latestKeyDataResponse) {
                    const result = await latest.latestKeyDataResponse;
                    const dbData =result.data.dbData;

                    setLatestData(dbData);

                    if (dbData && currentUser) {
                        // 添加 BTC Market Cap 数据
                        btcCompareData.btcStage.push({
                            time: dbData.btcMCTime,
                            btcMarketcap: dbData.btcMarketCap
                        });
            
                        // 添加 TGA Balance 数据 (注意属性名的大小写差异: TgaBalance vs tgaBalance)
                        btcCompareData.tgeStage.push({
                            time: dbData.tgaTime,
                            TgaBalance: dbData.tgaBalance
                        });
            
                        // 添加 US Stock Volume 数据 (注意属性名的大小写差异: StockVol vs usStockVol)
                        btcCompareData.usaStockStage.push({
                            time: dbData.stockTime,
                            StockVol: dbData.usStockVol
                        });
            
                        // 添加 H.4.1 Value 数据 (注意属性名的大小写差异: H41Value vs h41Value)
                        btcCompareData.h41Stage.push({
                            time: dbData.h41Time,
                            H41Value: dbData.h41Value
                        });
            
                        console.log("push success",btcCompareData);
                        
                    }else{
                        console.log("btcCompareData push fail or User don't login");
                        setLatestData(null);
                    }

                } else {
                    console.log("fail to load data");
                    setLatestData(null);

                }
            } catch (error) {
                console.error("发生错误:", error.message);
            }
        };

        processPromise();

    }, [latest]);


    return (
        <div className="container mx-auto p-4 space-y-8 ">
            <h1 className="text-3xl font-bold text-center mb-8">BTC Market Comparison</h1>

            <section>
                {/* <h2 className="text-2xl font-semibold mb-4">Trend Chart</h2> */}
                <MultiAxisLineChart btcCompareData={btcCompareData} />
            </section>
            {
                (currentUser) ?
                    <></> :
                    <div className="divider">visit latest data ?<a href={loginRedirectPath} className="link link-primary">Login</a></div>
            }

            <section>
                <h2 className="text-2xl font-semibold mb-4">Vertical Comparison</h2>
                <VerticalCompare btcCompareData={btcCompareData} />
            </section>
            {
                (currentUser) ?
                    <></> :
                    <div className="divider">visit latest data ?<a href={loginRedirectPath} className="link link-primary">Login</a></div>
            }

            <section>
                <h2 className="text-2xl font-semibold mb-4">Horizontal Comparison</h2>
                <HorizontalCompare btcCompareData={btcCompareData} />
            </section>
            {
                (currentUser) ?
                    <></> :
                    <div className="divider">visit latest data ?<a href={loginRedirectPath} className="link link-primary">Login</a></div>
            }
        </div>
    );
};

export default BtcCompare;