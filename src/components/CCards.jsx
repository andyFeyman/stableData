import React from 'react';

const CCards = ({l2Item}) => {
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle h-14 w-14">
                        <img
                            className="h-6 w-6"
                            src={l2Item.l2IconImg}
                            alt="Chain Icon" 
                        />
                    </div>
                    </div>
                    <div>
                    <div className="font-bold">{l2Item.l2Name}</div>
                    {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
            </td>
            <td>
                {(l2Item.dailyTransaction).toLocaleString()}
                <br />
                {/* <span className="text-sm opacity-50">Desktop </span> */}
            </td>
            <td>
                {l2Item.tpsNum}
            </td>
            <td>
                {l2Item.gasCost}
            </td>
            <th>
                <a href={l2Item.l2ExplorerLink} target="_blank" rel="noopener noreferrer"> Explorer</a>
            </th>
        </tr>
    )};

export default CCards;