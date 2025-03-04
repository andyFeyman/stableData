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
            <h5 className='mb-2'>Updated time:{new Date(l2DataRespone.data[0].updateTime).toLocaleString()} </h5> 
            <table className="table-lg ">
                {/* head */}
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Transactions Of Yesterday</th>
                        <th className="px-4 py-2">Current TPS</th>
                        <th className="px-4 py-2">Average Gas Cost</th>
                        <th className="px-4 py-2">Explorer</th>
                    </tr>
                </thead>
                <tbody>
                    {l2DataRespone.data.map((item)=>(                                                    
                        <CCards key={item.id} l2Item ={item} />                                                   
                    ))}              
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Transactions Of Yesterday</th>
                        <th className="px-4 py-2">Current TPS</th>
                        <th className="px-4 py-2">Average Gas Cost</th>
                        <th className="px-4 py-2">Explorer</th>
                    </tr>
                </tfoot>
            </table>
        </div> 
    )
}

export default CCardsList;
