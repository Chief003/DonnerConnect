import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase'; // Adjust the import path as needed

const columns = [
  {
    title: 'Donaters',
    dataIndex: 'user',
    key: 'user',
    render: (text, record) => (
      <>
        <div className="font-medium" style={{ fontWeight: '3rem' }}>{record.name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline" style={{ opacity: '0.74' }}>{record.email}</div>
      </>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
  },
];

const TransactionsCard = () => {
  const [data, setData] = useState([]);

  const fetchUserData = async () => {
    const userCollectionRef = collection(firestore, 'users');
    try {
      const querySnapshot = await getDocs(userCollectionRef);
      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          userDataArray.push({
            key: doc.id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            amount: `Kshs ${data.donations}`,
          });
        } else {
          console.log('No such document!');
        }
      });
      setData(userDataArray);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Card
      style={{ width: '500px', borderRadius: '10px', boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)' }}
      title={
        <div className="flex flex-row items-center">
          <div className="grid gap-2">
            <h3>Transactions</h3>
            <p style={{ opacity: '0.74' }}>Recent transactions from your application.</p>
          </div>
        </div>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
      />
    </Card>
  );
};

export default TransactionsCard;
