import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import StableText from "../components/StableText.jsx";
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
                <Col md={4}>
                    <h2>ATH VS Daily</h2>
                </Col>
                
            </Row>
            <Row className="justify-content-center mb-4">
                <Col md={8}>
                    <StableText daily={dailyData} ath={athData}/>
                </Col>

            </Row>

        </Container>
 
    )
}

export default StableCoinPage;