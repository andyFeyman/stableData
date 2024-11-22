import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import StableChart from "../components/stableChart/stableChart";
import StableText from "../components/stableChart/StableText";

function StableCoinPage(){
    return(
        <Container fluid>
            <Row className="justify-content-center mt-4 text-center">
                <Col md={8}>
                    <h2>Stablecoin TVL Everyday</h2>
                </Col>
                
            </Row>
            <Row className="justify-content-center">
            
                <Col md={3}>
                    <StableChart />
                </Col>
                <Col md={5}>
                    <StableText />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={8}>

                </Col>
            </Row>
  
        </Container>
 
    )
}

export default StableCoinPage;