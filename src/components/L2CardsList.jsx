import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import L2Cards from './L2Cards';

function L2CardsList(){

    const data= [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    return(
       <Container className='mt-4'>
            {/* 遍历数据，生成一行一行的Grid结构 */}
            <Row  className="gy-2 mb-3 py-2">
                {data.map((item, index) => (
                    <Col  md={6} lg={3} key={index}>
                        <L2Cards />
                    </Col>
                ))}
            </Row>
            
       </Container>
    )
}

export default L2CardsList;