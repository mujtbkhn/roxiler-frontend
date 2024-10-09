import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://roxiler-backend-91qq.onrender.com/api'; // Update this to match your backend URL

const TransactionsTable = ({ selectedMonth, selectedYear }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, selectedYear, currentPage, searchTerm]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`, {
        params: {
          month: selectedMonth,
          year: selectedYear,
          search: searchTerm,
          page: currentPage,
          perPage: 10
        },
      });
      console.log(response.data)
      setTransactions(response.data.products);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border rounded"
      />
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Sold</th>
                <th className="p-2 border">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="p-2 border">{transaction.id}</td>
                  <td className="p-2 border">{transaction.title}</td>
                  <td className="p-2 border">{transaction.description}</td>
                  <td className="p-2 border">${transaction.price.toFixed(2)}</td>
                  <td className="p-2 border">{transaction.category}</td>
                  <td className="p-2 border">{transaction.sold ? 'Yes' : 'No'}</td>
                  <td className="p-2 border"><img src={transaction.image} alt="" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;