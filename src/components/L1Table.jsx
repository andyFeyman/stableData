import React from 'react';
import L1Threads from './L1Threads';

function L1Table({ l1DailyRespone }) {
  return (
    <div className="overflow-x-auto mt-2">
      <h6 className="mb-2 flex justify-end">
        Updated: {new Date(l1DailyRespone.data[0]?.updateTime).toLocaleString()}
      </h6>
      <table className="table-lg table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Txs Of Yesterday</th>
            <th className="px-4 py-2">Average TPS Of 24H</th>
            <th className="px-4 py-2">Average Txs Cost</th>
            <th className="px-4 py-2">Explorer</th>
          </tr>
        </thead>
        <tbody>
          {l1DailyRespone.data.map((item) => (
            <L1Threads key={item.id} l1Item={item} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Txs Of Yesterday</th>
            <th className="px-4 py-2">Average TPS Of 24H</th>
            <th className="px-4 py-2">Average Txs Cost</th>
            <th className="px-4 py-2">Explorer</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default L1Table;