import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Input, Badge } from 'antd';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Navbar from './Navbar';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [confirmApproveVisible, setConfirmApproveVisible] = useState(false);
  const [approvingAppointmentId, setApprovingAppointmentId] = useState(null);
  const [isRejectReasonValid, setIsRejectReasonValid] = useState(false);

  const fetchAppointments = async () => {
    const appointmentsCollection = collection(firestore, 'appointments');
    try {
      const querySnapshot = await getDocs(appointmentsCollection);
      const appointmentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppointments(appointmentsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      message.error('Failed to fetch appointments.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleApprove = (appointmentId) => {
    setApprovingAppointmentId(appointmentId);
    setConfirmApproveVisible(true);
  };

  const confirmApprove = async () => {
    try {
      const appointmentRef = doc(firestore, 'appointments', approvingAppointmentId);
      await updateDoc(appointmentRef, { status: 'approved' });
      message.success('Appointment approved.');
      fetchAppointments(); // Refresh appointments
      setConfirmApproveVisible(false);
    } catch (error) {
      console.error('Error approving appointment:', error);
      message.error('Failed to approve appointment.');
    }
  };

  const cancelApprove = () => {
    setConfirmApproveVisible(false);
    setApprovingAppointmentId(null);
  };

  const handleReject = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsModalVisible(true);
  };

  const handleRejectConfirm = async () => {
    try {
      if (rejectionReason.trim() === '') {
        message.error('Please enter a reason for rejection.');
        return;
      }

      const appointmentRef = doc(firestore, 'appointments', selectedAppointmentId);
      await updateDoc(appointmentRef, { status: 'rejected', RejectionReason: rejectionReason });
      message.success('Appointment rejected.');
      setIsModalVisible(false);
      setRejectionReason('');
      fetchAppointments(); // Refresh appointments
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      message.error('Failed to reject appointment.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setRejectionReason('');
  };

  const handleRejectionReasonChange = (e) => {
    const reason = e.target.value;
    setRejectionReason(reason);
    setIsRejectReasonValid(reason.trim() !== '');
  };

  const renderStatusBadge = (status) => {
    let color;
    let text;

    switch (status) {
      case 'approved':
        color = 'green';
        text = 'Approved';
        break;
      case 'rejected':
        color = 'red';
        text = 'Rejected';
        break;
      case 'under review':
      default:
        color = 'grey';
        text = 'Under Review';
        break;
      case 'cancelled':
        color = 'orange';
        text = 'Cancelled';
        break;
    }

    return <Badge color={color} text={text} />;
  };

  const columns = [
    { title: 'School', dataIndex: 'schoolId', key: 'schoolId' },
    { title: 'User', dataIndex: 'userName', key: 'userName' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { title: 'Date and Time', dataIndex: 'dateTime', key: 'dateTime' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusBadge(status),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleApprove(record.id)} disabled={record.status !== 'under review'}>
            Approve
          </Button>
          <Button type="danger" onClick={() => handleReject(record.id)} disabled={record.status !== 'under review'} style={{ marginLeft: '10px' }}>
            Reject
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Navbar/>
      <div style={{ marginTop: '100px' }}>
        <h1 style={{color:'black',fontFamily:'san-serif'}}>Appointments</h1>
        <Table
          dataSource={appointments}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
        <Modal
          title="Reject Appointment"
          visible={isModalVisible}
          onOk={handleRejectConfirm}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !isRejectReasonValid }}
        >
          <Input.TextArea
            rows={4}
            value={rejectionReason}
            onChange={handleRejectionReasonChange}
            placeholder="Enter the reason for rejection"
          />
        </Modal>
        <Modal
          title="Confirm Approval"
          visible={confirmApproveVisible}
          onOk={confirmApprove}
          onCancel={cancelApprove}
        >
          <p>Are you sure you want to approve this appointment?</p>
        </Modal>
      </div>
    </>
  );
};

export default Appointments;
