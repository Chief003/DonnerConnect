import React, { useState, useEffect } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm, Modal, Form } from 'antd';
import { useUserAuth } from '../../context/UserAuthContext';
import { firestore } from '../../firebase'; // Adjust the import path as needed
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';
import SchoolTable from './SchoolTable';

const CustomTable = () => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchUserData = async () => {
    if (user) {
      const userCollectionRef = collection(firestore, 'users');
      try {
        const querySnapshot = await getDocs(userCollectionRef);
        const userDataArray = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            userDataArray.push({
              key: doc.id, // Assuming doc.id is unique for each user
              firstName: data.firstName,
              lastName: data.lastName,
              birthday: data.birthday,
              gender: data.gender,
              email: data.email,
              phone: data.phone,
              address: data.address,
              addressNumber: data.addressNumber,
              city: data.city,
              constituency: data.constituency,
              zip: data.zip,
              donations: data.donations,
            });
          } else {
            console.log('No such document!');
          }
        });
        setUserData(userDataArray);
        setFilteredData(userDataArray);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = userData.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText('');
    setFilteredData(userData);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await deleteDoc(doc(firestore, 'users', record.key));
      setFilteredData(filteredData.filter((item) => item.key !== record.key));
      setIsModalVisible(false); // Close modal if open
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedRecord = { ...editingRecord, ...values };
      await updateDoc(doc(firestore, 'users', editingRecord.key), updatedRecord);
      setFilteredData(
        filteredData.map((item) => (item.key === editingRecord.key ? updatedRecord : item))
      );
      setIsModalVisible(false);
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      fixed: 'left',
      width: 150,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      fixed: 'left',
      width: 150,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150,
      sorter: (a, b) => new Date(a.birthday) - new Date(b.birthday),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Address Number',
      dataIndex: 'addressNumber',
      key: 'addressNumber',
      width: 100,
      sorter: (a, b) => a.addressNumber.localeCompare(b.addressNumber),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 150,
      sorter: (a, b) => a.city.localeCompare(b.city),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Constituency',
      dataIndex: 'constituency',
      key: 'constituency',
      width: 150,
      sorter: (a, b) => a.constituency.localeCompare(b.constituency),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Donations',
      dataIndex: 'donations',
      key: 'donations',
      width: 150,
      sorter: (a, b) => a.donations.localeCompare(b.donations),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)} icon={<EditOutlined />}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
    <div style={{backgroundImage: `url('/images/bg-8.jpg')`, // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'}}>
    <Navbar/>
    <Container style={{marginTop:'50px'}}>
    <Space style={{ marginBottom: '16px',marginTop:'50px'}}>
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Button onClick={handleReset}>Reset</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 1500 }} // Adjust the scroll width as needed
        pagination={{ pageSize: 10 }} // Adjust the pagination as needed
      />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingRecord}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[{ required: true, message: 'Please enter birthday' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please enter gender' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="addressNumber"
            label="Address Number"
            rules={[{ required: true, message: 'Please enter address number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please enter city' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="constituency"
            label="Constituency"
            rules={[{ required: true, message: 'Please enter constituency' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
     <SchoolTable/>
     </div>
    </>
  );
};

export default CustomTable;
