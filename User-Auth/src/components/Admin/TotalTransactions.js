import React, { useState, useEffect } from 'react';
import { Card, Table, Input, Button } from 'antd';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase'; 
import { Link } from 'react-router-dom';

const { Search } = Input;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '50'],
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsCollectionRef = collection(firestore, 'transactions');
      const transactionsQuery = query(transactionsCollectionRef, orderBy('date', 'desc'));

      try {
        const querySnapshot = await getDocs(transactionsQuery);
        const transactionsData = [];

        querySnapshot.forEach(docSnapshot => {
          if (docSnapshot.exists()) {
            const transactionData = docSnapshot.data();

            transactionsData.push({
              key: docSnapshot.id,
              name: transactionData.name,
              schoolName: transactionData.schoolId, 
              amount: transactionData.amount,
              date: transactionData.date, 
            });
          }
        });

        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData); 
        setPagination(prevPagination => ({
          ...prevPagination,
          total: transactionsData.length,
        }));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Function to handle search input change
  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    // Filter transactions based on search text (schoolName or donor name)
    const filtered = transactions.filter(item =>
      item.schoolName.toLowerCase().includes(value) || // Search by schoolName
      item.name.toLowerCase().includes(value)         // Search by donor name
    );

    setFilteredTransactions(filtered);
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset current page to 1 when searching
      total: filtered.length,
    }));
  };

  // Function to reset search and filter
  const handleReset = () => {
    setSearchText('');
    setFilteredTransactions(transactions); // Reset filteredTransactions to original data
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset current page to 1 when resetting
      total: transactions.length,
    }));
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log('pagination:', pagination);
    console.log('filters:', filters);
    console.log('sorter:', sorter);
    setPagination(pagination);
  };

  const columns = [
    {
      title: 'Donor Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'School Name',
      dataIndex: 'schoolName',
      key: 'schoolName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: amount => `Kshs ${amount.toFixed(2)}`, 
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: date => new Date(date.seconds * 1000).toLocaleString(),
      sorter: (a, b) => a.date.seconds - b.date.seconds,
    },
  ];

  // Calculate total amount
  const totalAmount = filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <Card
      style={{ width: '1220px', borderRadius: '10px', boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)', marginTop: '30px', marginLeft: '30px', marginRight: '30px',   backgroundImage: `url('/images/bg-8.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh' }}
      title="All Transactions"
    >
      <div className="flex flex-row items-center" style={{ paddingBottom: '9px' }}>
        <div className="grid gap-2">
          <h3>All Transactions</h3>
          <Search placeholder="Search by School or Donor Name" onChange={handleSearch} value={searchText} style={{ width: 250, marginRight: '10px' }} />
          <Button onClick={handleReset}>Reset</Button>
          <Link to='/admin' style={{ marginLeft: '732px' }}>
            <Button type="primary">Go to Profile</Button>
          </Link>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredTransactions}
        pagination={pagination}
        onChange={handleTableChange}
        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
        footer={() => (
          <div style={{ textAlign: 'right', paddingRight: '20px' }}>
            <strong>Total:</strong> Kshs {totalAmount.toFixed(2)}
          </div>
        )}
      />
    </Card>
  );
};

export default Transactions;
