import React from 'react';

const L1Threads = ({ l1Item }) => {
  return (
    <tr>
      <td className="px-2 py-1 ">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="mask mask-squircle h-10 w-10">
              <img
                className="h-6 w-6"
                src={l1Item.l1Img}
                alt={l1Item.l1Name+'Chain Icon'}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{l1Item.l1Name}</div>
          </div>
        </div>
      </td>
      <td className="px-2 py-1 text-center">
        {Number(l1Item.dailyTransaction).toLocaleString()}
      </td>
      <td className="px-2 py-1 text-center">{l1Item.tpsNum}</td>
      <td className="px-2 py-1 text-center">{l1Item.gasCost}$</td>
      <th className="px-2 py-1 text-center">
        <a href={l1Item.l1ExplorerLink} target="_blank" rel="noopener noreferrer">
          Go
        </a>
      </th>
    </tr>
  );
};

export default L1Threads;