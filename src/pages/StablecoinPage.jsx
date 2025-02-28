import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import StableText from "../components/StableText.jsx";
import {useLoaderData} from "react-router-dom";
import { Helmet } from "react-helmet";

function StableCoinPage(){

    const stableData = useLoaderData();
    const dailyData = stableData.stableResponse.data;
    const athData = stableData.stableATH.data;
    
    return(
        <div className="container-fluid">
            <Helmet>
                <title>Stablecoin Data And Stablecoin comparison</title>
                <meta name="description" content="Analyze stablecoin market data,stablecoin comparison, track daily volume, historical highs, and compare with traditional assets like stocks and bonds. provides professional data analysis to help you assess stablecoin investment risks and opportunities." />
                <meta name="keywords" content="stablecoin comparison,Cryptocurrency, stablecoin volume ratio,stablecoin market cap,Trading Volume, TPS, Fees, Blockchain, Bitcoin, Ethereum, Stablecoin, USDT, USDC, Stocks, Bonds, Market Analysis" />
            </Helmet>
            <div className="flex flex-col items-center mt-4 ">
                <div className="text-center mb-4">
                    <h1>Daily VS ATH</h1>
                </div>
                {/* 移除 Bootstrap Row/Col, 使用 Tailwind 类 */}
                <div className="mx-auto  px-4 w-9/12">
                    <StableText daily={dailyData} ath={athData}/>
                </div>
             
            </div>
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