import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase'; // Adjust the import path as needed
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Row, Col, Card, Typography, Statistic, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpOutlined } from '@ant-design/icons';
import TransactionsCard from '../test';

const { Title } = Typography;
const { Option } = Select;

const Stats = () => {
  const [userCount, setUserCount] = useState(0);
  const [schoolCount, setSchoolCount] = useState(0);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [allSchoolsData, setAllSchoolsData] = useState([]);
  const [selectedSchoolData, setSelectedSchoolData] = useState(null);
  const [donationsByDate, setDonationsByDate] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch users
      const usersCollectionRef = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      setUserCount(usersSnapshot.size);

      // Fetch schools
      const schoolsCollectionRef = collection(firestore, 'School');
      const schoolsSnapshot = await getDocs(schoolsCollectionRef);
      setSchoolCount(schoolsSnapshot.size);

      // Calculate total donations across all users
      let totalAmount = 0;
      usersSnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.donations) {
          totalAmount += userData.donations; // Assuming 'donations' is a numeric field in each user document
        }
      });
      setTotalDonationAmount(totalAmount);

      // Fetch donation data for all schools
      const allSchoolsDataArray = schoolsSnapshot.docs.map(doc => {
        const schoolData = doc.data();
        return {
          schoolId: doc.id,
          schoolName: schoolData.name,
          donated: schoolData.donated || 0,
        };
      });
      setAllSchoolsData(allSchoolsDataArray);

      // Fetch transactions and group by date
      const transactionsCollectionRef = collection(firestore, 'transactions');
      const transactionsQuery = query(transactionsCollectionRef, orderBy('date', 'asc'));
      const transactionsSnapshot = await getDocs(transactionsQuery);

      const transactionsData = transactionsSnapshot.docs.map(doc => doc.data());
      const groupedByDate = transactionsData.reduce((acc, transaction) => {
        const date = new Date(transaction.date.seconds * 1000).toISOString().split('T')[0]; // Extract date part only
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
      }, {});

      const donationsByDateArray = Object.keys(groupedByDate).map(date => ({
        date,
        amount: groupedByDate[date],
      }));
      setDonationsByDate(donationsByDateArray);
    };

    fetchStats();
  }, []);

  const handleSchoolChange = (value) => {
    const selectedSchool = allSchoolsData.find(school => school.schoolId === value);
    setSelectedSchoolData(selectedSchool);
  };

  return (
    <>
      <div style={{ padding: '20px'}}>
        <Title level={2}>Dashboard</Title>
        <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
          <Col span={8}>
            <Card bordered={false} style={{boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)'}}>
              <Statistic
                title="Total Users"
                value={userCount}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="Users"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)'}}>
              <Statistic
                title="Total Schools"
                value={schoolCount}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="Schools"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)'}}>
              <Statistic
                title="Total Donations"
                value={totalDonationAmount}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="Kshs"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{marginBottom:'10px'}}>
          <Col span={12}>
            <Card title="Daily Donations" style={{boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)'}}>
              <ResponsiveContainer width="100%" height={348}>
                <BarChart data={donationsByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card title="Donations by School" style={{boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)'}}>
              <Select placeholder="Select a school" onChange={handleSchoolChange} style={{ width: 200, marginBottom: 16 }}>
                {allSchoolsData.map(school => (
                  <Option key={school.schoolId} value={school.schoolId}>{school.schoolName}</Option>
                ))}
              </Select>
              {selectedSchoolData && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[{ schoolName: selectedSchoolData.schoolName, donated: selectedSchoolData.donated }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="schoolName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="donated" fill="#82ca9d" />
                    <Bar dataKey={() => totalDonationAmount} fill="#8884d8" name="Total Donations" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>
          </Col>
        </Row>
        <TransactionsCard/>
      </div>
    </>
  );
};

export default Stats;
