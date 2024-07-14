import React, { useState, useEffect } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm, Modal, Form } from 'antd';
import { useUserAuth } from '../../context/UserAuthContext';
import { firestore } from '../../firebase'; // Adjust the import path as needed
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';

const SchoolTable = () => {
  const { user } = useUserAuth();
  const [schoolData, setSchoolData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchSchoolData = async () => {
    if (user) {
      const schoolCollectionRef = collection(firestore, 'School'); // Change collection name
      try {
        const querySnapshot = await getDocs(schoolCollectionRef);
        const schoolDataArray = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            schoolDataArray.push({
              key: doc.id, // Assuming doc.id is unique for each school
              location: data.Location,
              name: data.Name,
              studentPopulation: data['Student Population'], // Adjust field name if necessary
              latitude: data.latitude, // Assuming these fields exist
              longitude: data.longitude, // Assuming these fields exist
              donations: data.donated
            });
          } else {
            console.log('No such document!');
          }
        });
        setSchoolData(schoolDataArray);
        setFilteredData(schoolDataArray);
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, [user]);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = schoolData.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText('');
    setFilteredData(schoolData);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await deleteDoc(doc(firestore, 'School', record.key)); // Change collection name
      setFilteredData(filteredData.filter((item) => item.key !== record.key));
      alert('School deleted successfully');
    } catch (error) {
      console.error('Error deleting school:', error);
      alert('Failed to delete school');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditMode) {
        const updatedRecord = { ...editingRecord, ...values };
        await updateDoc(doc(firestore, 'School', editingRecord.key), updatedRecord); // Change collection name
        setFilteredData(
          filteredData.map((item) => (item.key === editingRecord.key ? updatedRecord : item))
        );
        alert('School updated successfully');
      } else {
        const newDocRef = await addDoc(collection(firestore, 'School'), values); // Change collection name
        const newRecord = { key: newDocRef.id, ...values };
        setFilteredData([...filteredData, newRecord]);
        alert('School added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving school:', error);
      alert('Failed to save school');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const columns = [
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      fixed: 'left',
      width: 150,
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Student Population',
      dataIndex: 'studentPopulation',
      key: 'studentPopulation',
      width: 150,
      sorter: (a, b) => a.studentPopulation - b.studentPopulation,
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
            title="Are you sure you want to delete this school?"
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
      <Navbar />
      <Container style={{ marginTop: '50px' }}>
        <Space style={{ marginBottom: '16px', marginTop: '50px' }}>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            Add School
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 600 }} // Adjust the scroll width as needed
          pagination={{ pageSize: 10 }} // Adjust the pagination as needed
        />
        <Modal
          title={isEditMode ? "Edit School" : "Add School"}
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
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="studentPopulation"
              label="Student Population"
              rules={[{ required: true, message: 'Please enter student population' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="latitude"
              label="Latitude"
              rules={[{ required: true, message: 'Please enter latitude' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="longitude"
              label="Longitude"
              rules={[{ required: true, message: 'Please enter longitude' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default SchoolTable;
