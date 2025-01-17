import React from 'react';
import CCards from './CCards';
import L2CardsList from './L2CardsList';
import {Await, useLoaderData,useOutletContext} from 'react-router-dom';
import { Suspense } from "react";

function CCardsList(){

    const l2Data = useLoaderData();
    //console.log(l2Data.l2DataRespone.data);
    //console.log(l2Data.l2DataRespone.data[0].l2Name);
    const { displayChecked } = useOutletContext(); // 获取 displayChecked

    // 如果 displayChecked 为 false，不渲染 CCardsList
    if (!displayChecked) {
      return <L2CardsList />;
    }

    return(
        <div className="overflow-x-auto mt-6 mx-2">
            <h4 className='mx-4 mt-4'>Updated time:{new Date(l2Data?.l2DataRespone.data[0].updateTime).toLocaleString()} </h4> 
            <table className="table w-8/12 mx-4">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Transactions Of Yesterday</th>
                        <th>Current TPS</th>
                        <th>Average Gas Cost</th>
                        <th>Explorer</th>
                    </tr>
                </thead>
                <tbody>
                    {l2Data?.l2DataRespone.data.map((item)=>(

                        <Suspense fallback={<p>loading posts data</p>} key={item.id}>
                            <Await
                                resolve={l2Data?.l2DataRespone}
                                errorElement={<p>Error loading posts!</p>}
                            >
                                {(l2DataRespone)=>                              
                                    <CCards key={item.id} l2Item ={item} />                               
                                }
                            </Await>
                        </Suspense>
                    ))}              
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Transactions Of Yesterday</th>
                        <th>Current TPS</th>
                        <th>Average Gas Cost</th>
                        <th>Explorer</th>
                    </tr>
                </tfoot>
            </table>
        </div> 
    )
}

export default CCardsList;
