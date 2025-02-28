import React from 'react';


const L1Threads = ({l1Item}) => {
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10">
                        <img
                            className="h-6 w-6"
                            src={l1Item.l1Img}
                            alt="Chain Icon" 
                        />
                    </div>
                    </div>
                    <div>
                    <div className="font-bold">{l1Item.l1Name}</div>
                    {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
            </td>
            <td>
                {Number(l1Item.dailyTransaction).toLocaleString()}
                <br />
                {/* <span className="text-sm opacity-50">Desktop </span> */}
            </td>
            <td>
                {l1Item.tpsNum}
            </td>
            <td>
                {l1Item.gasCost}$
            </td>
            <th>
                <a href={l1Item.l1ExplorerLink} target="_blank" rel="noopener noreferrer"> Explorer</a>
            </th>
        </tr>
    )};

export default L1Threads;