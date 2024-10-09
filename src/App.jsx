import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const API_BASE_URL = 'http://localhost:5000/api'; // Update this to match your backend URL

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // March by default
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [transactionsRes, statisticsRes, barChartRes, pieChartRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/transactions`, { params: { month: selectedMonth, page: 1, perPage: 10 } }),
          axios.get(`${API_BASE_URL}/statistics`, { params: { month: selectedMonth } }),
          axios.get(`${API_BASE_URL}/bar-chart`, { params: { month: selectedMonth } }),
          axios.get(`${API_BASE_URL}/pie-chart`, { params: { month: selectedMonth } })
        ]);

        setTransactions(transactionsRes.data.products);
        setStatistics(statisticsRes.data);
        setBarChartData(barChartRes.data);
        setPieChartData(pieChartRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Product Transactions Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border rounded"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Statistics data={statistics} />
          <TransactionsTable 
            selectedMonth={selectedMonth}
          />
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
            <BarChart data={barChartData} />
            <PieChart data={pieChartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;