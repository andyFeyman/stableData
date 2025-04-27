import React from 'react';

const CCards = ({l2Item}) => {
    return (
        <tr>
            <td className="px-2 py-1">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10">
                        <img
                            className="h-6 w-6"
                            src={l2Item.l2IconImg}
                            alt="Etherum L2 Icon" 
                        />
                    </div>
                    </div>
                    <div>
                    <div className="font-bold">{l2Item.l2Name}</div>
                    {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
            </td>
            <td className="px-2 py-1 text-center">
                {(l2Item.dailyTransaction).toLocaleString()}
                <br />
                {/* <span className="text-sm opacity-50">Desktop </span> */}
            </td>
            <td className="px-2 py-1 text-center">
                {l2Item.tpsNum ===null? "null" : l2Item.tpsNum}
            </td>
            <td className="px-2 py-1 text-center">
                {l2Item.gasCost}$
            </td>
            <th className="px-2 py-1 text-center">
                <a href={l2Item.l2ExplorerLink} target="_blank" rel="noopener noreferrer"> Go</a>
            </th>
        </tr>
    )};

export default CCards;