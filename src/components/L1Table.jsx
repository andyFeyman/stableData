import React from 'react';
import L1Threads from './L1Threads';
// import { useLoaderData } from 'react-router-dom';
// import { Suspense } from 'react';

function L1Table({ l1DailyRespone }) {
  //const { l1DailyRespone } = useLoaderData();

  return (

      <div className="overflow-x-auto mt-6 mx-2">
        <h4 className="mx-4 mt-4">
          Updated: {new Date(l1DailyRespone.data[0]?.updateTime).toLocaleString()}
        </h4>
        <table className="table-lg w-9/12">
          <thead>
            <tr>
              <th>Name</th>
              <th>Transactions Of Yesterday</th>
              <th>Average TPS Of 24H</th>
              <th>Average Gas Cost</th>
              <th>Explorer</th>
            </tr>
          </thead>
          <tbody>
            {l1DailyRespone.data.map((item) => (
              <L1Threads key={item.id} l1Item={item} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Transactions Of Yesterday</th>
              <th>Average TPS Of 24H</th>
              <th>Average Gas Cost</th>
              <th>Explorer</th>
            </tr>
          </tfoot>
        </table>
      </div>

  );
}

export default L1Table;

