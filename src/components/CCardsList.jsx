import React from 'react';
import CCards from './CCards';
import L2CardsList from './L2CardsList';
import {Await, useLoaderData,useOutletContext} from 'react-router-dom';
import { Suspense } from "react";

function CCardsList({ l2DataRespone }){

    //const l2Data = useLoaderData();
    //console.log(l2Data.l2DataRespone.data);
    //console.log(l2Data.l2DataRespone.data[0].l2Name);
    //const { displayChecked } = useOutletContext(); // 获取 displayChecked

    // 如果 displayChecked 为 false，不渲染 CCardsList
    // if (!displayChecked) {
    //   return <L2CardsList />;
    // }

    return(
        <div className="overflow-x-auto mt-2">
            <h6 className='mb-2 flex justify-end'>Updated time:{new Date(l2DataRespone.data.l2DailyData[0].updateTime).toLocaleString()} </h6> 
            <table className="table-lg table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Txs Of Yesterday</th>
                        <th className="px-4 py-2">Current TPS</th>
                        <th className="px-4 py-2">Average Txs Cost</th>
                        <th className="px-4 py-2">Explorer</th>
                    </tr>
                </thead>
                <tbody>
                    {l2DataRespone.data.l2DailyData.map((item)=>(                                                    
                        <CCards key={item.id} l2Item ={item} />                                                   
                    ))}              
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Txs Of Yesterday</th>
                        <th className="px-4 py-2">Current TPS</th>
                        <th className="px-4 py-2">Average Txs Cost</th>
                        <th className="px-4 py-2">Explorer</th>
                    </tr>
                </tfoot>
            </table>
        </div> 
    )
}

export default CCardsList;
