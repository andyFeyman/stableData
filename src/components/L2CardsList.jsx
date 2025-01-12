import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import L2Cards from './L2Cards';
import {Await, useLoaderData} from 'react-router-dom';
import { Suspense } from "react";

function L2CardsList(){

    const l2Data = useLoaderData();
    //console.log(l2Data.l2DataRespone.data);
    //console.log(l2Data.l2DataRespone.data[0].l2Name);
    return(
       <Container className='mt-4'>
            <h4>Updated time:{new Date(l2Data.l2DataRespone.data[0].updateTime).toLocaleString()} </h4> 
            
            {/* 遍历数据，生成一行一行的Grid结构 */}
            <Row  className="gy-2 mb-3 py-2">
            {l2Data.l2DataRespone.data.map((item)=>(
                <Col  md={6} lg={3} key={item.id}>
                    <Suspense fallback={<p>loading posts data</p>}>
                        <Await
                            resolve={l2Data.l2DataRespone}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(l2DataRespone)=>                              
                                <L2Cards key={item.id} l2Item ={item}/>
                            }
                        </Await>
                    </Suspense>
                    {/* <L2Cards /> */}
                </Col>
            ))}
            </Row>
            
       </Container>
    )
}

export default L2CardsList;
