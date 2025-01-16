import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import StableText from "../components/StableText.jsx";
import {useLoaderData} from "react-router-dom";
import { Helmet } from "react-helmet";

function StableCoinPage(){

    const stableData = useLoaderData();
    //console.log(stableData.stableResponse.data);
    //console.log(stableData.stableATH.data);
    const dailyData = stableData.stableResponse.data;
    const athData = stableData.stableATH.data;
    
    return(
        <div className="container-fluid">
            <Helmet>
                <title>Stablecoin Data</title>
                <meta name="description" content="Stablecoin TVL OF ALL TIME HIGHT and  Stablecoin Daily Data, how to known the crypto market is bull or bear." />
                <meta name="keywords" content="Stablecoin, Cryptocurrency Market,Bitcoin,Cryptocurrency" />
            </Helmet>
            <div className="flex flex-col items-center mt-4 ">
                <div className="text-center mb-4">
                    <h2>Daily Vs ATH</h2>
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