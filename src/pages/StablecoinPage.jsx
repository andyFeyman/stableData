import React from "react";
import { Suspense } from "react";
import StableText from "../components/StableText.jsx";
import {useLoaderData,Await} from "react-router-dom";
import { Helmet } from "react-helmet";
import StablecoinInfo from "../components/InfoText/StableInfo.jsx";


function StableCoinPage(){

    const stableData = useLoaderData();
    
    return(
        <div className="w-full flex flex-col items-center">
            <Helmet>
                <title>Stablecoin Data And Stablecoin comparison</title>
                <meta name="description" content="Analyze stablecoin market data,stablecoin comparison, track daily volume, historical highs, and compare with traditional assets like stocks and bonds. provides professional data analysis to help you assess stablecoin investment risks and opportunities." />
                <meta name="keywords" content="stablecoin comparison,Cryptocurrency, stablecoin volume ratio,stablecoin market cap,Trading Volume, TPS, Fees, Blockchain, Bitcoin, Ethereum, Stablecoin, USDT, USDC, Stocks, Bonds, Market Analysis" />
            </Helmet>
            <Suspense fallback={<span className="mx-auto loading loading-spinner loading-xl "></span>}>
                <Await 
                    resolve={Promise.all([stableData.stableResponse, stableData.stableATH])}
                    errorElement={<div>Error loading Stablecoin data!</div>}
                >
                {([stableResponse,stableATH])=>(

                    <div className="w-full flex flex-col items-center mt-4 ">
                        <div className="text-center mb-4">
                            <h1>Daily VS ATH</h1>
                        </div>
                        {/* 移除 Bootstrap Row/Col, 使用 Tailwind 类 */}
                        <div className="mx-auto max-w-screen-lg w-9/12">
                            <StableText daily={stableResponse.data} ath={stableATH.data}/>
                            
                        </div>
                        
                        
                    </div>
                )}
                </Await>
            </Suspense>
            <StablecoinInfo />
            
        </div>
        // <Container fluid>
        //     <Row className="justify-content-center mt-4 text-center">
        //         <Col md={4}>
        //             <h2>ATH VS Daily</h2>
        //         </Col>
                
        //     </Row>
        //     <Row className="justify-content-center mb-4">
        //         <Col md={8}>
        //             <StableText daily={dailyData} ath={athData}/>
        //         </Col>

        //     </Row>

        // </Container>
 
    )
}

export default StableCoinPage;