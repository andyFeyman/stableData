import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
//import StableChart from "../components/stableChart/stableChart.jsx";
import StableText from "../components/stableChart/StableText.jsx";
import {useLoaderData} from "react-router-dom";


function StableCoinPage(){

    const stableData = useLoaderData();
    //console.log(stableData.stableResponse.data);
    //console.log(stableData.stableATH.data);
    const dailyData = stableData.stableResponse.data;
    const athData = stableData.stableATH.data;
    
    return(
        <Container fluid>
            <Row className="justify-content-center mt-4 text-center">
                <Col md={8}>
                    <h2>Stablecoin TVL Everyday</h2>
                </Col>
                
            </Row>
            <Row className="justify-content-center">
            
                <Col md={3}>
                    {/* <StableChart /> */}
                </Col>
                <Col md={5}>
                    <StableText daily={dailyData} ath={athData}/>
                </Col>
            </Row>

        
  
        </Container>
 
    )
}

export default StableCoinPage;