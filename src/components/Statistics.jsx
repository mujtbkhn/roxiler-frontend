import React from 'react';

const Statistics = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-blue-100 p-4 rounded">
        <h3 className="font-bold">Total Sale Amount</h3>
        <p>${data?.totalSaleAmount?.toFixed(2) || 0}</p>
      </div>
      <div className="bg-green-100 p-4 rounded">
        <h3 className="font-bold">Total Sold Items</h3>
        <p>{data?.totalSoldItems || 0}</p>
      </div>
      <div className="bg-red-100 p-4 rounded">
        <h3 className="font-bold">Total Not Sold Items</h3>
        <p>{data?.totalNotSoldItems || 0}</p>
      </div>
    </div>
  );
};

export default Statistics;