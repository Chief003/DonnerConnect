import React, { useState, useEffect } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase'; // Adjust the import path as needed
import { Dropdown, Menu, Badge, Spin } from 'antd';
import moment from 'moment';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    // Fetch the latest 5 transactions
    const transactionsCollectionRef = collection(firestore, 'transactions');
    const transactionsQuery = query(transactionsCollectionRef, orderBy('date', 'desc'), limit(5));
    
    // Fetch the latest 5 appointments
    const appointmentsCollectionRef = collection(firestore, 'appointments');
    const appointmentsQuery = query(appointmentsCollectionRef, orderBy('dateTime', 'desc'), limit(5));

    try {
      const [transactionSnapshot, appointmentSnapshot] = await Promise.all([
        getDocs(transactionsQuery),
        getDocs(appointmentsQuery)
      ]);

      const notificationsArray = [];

      transactionSnapshot.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          notificationsArray.push({
            key: doc.id,
            type: 'transaction',
            message: `${data.name} has contributed Kshs ${data.amount}`,
            date: data.date.seconds * 1000,
          });
        }
      });

      appointmentSnapshot.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          notificationsArray.push({
            key: doc.id,
            type: 'appointment',
            message: `${data.userName} has made an appointment with ${data.schoolId}`,
            date: data.dateTime.seconds * 1000,
          });
        }
      });

      notificationsArray.sort((a, b) => b.date - a.date);
      setNotifications(notificationsArray.slice(0, 5)); // Limit to 5 latest notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const menu = (
    <Menu style={{ width: '350px' }}>
      {loading ? (
        <Menu.Item disabled>
          <Spin />
        </Menu.Item>
      ) : (
        notifications.length > 0 ? (
          notifications.map((notification) => (
            <Menu.Item key={notification.key}>
              <div>
                <strong>{notification.message}</strong>
                <p>
                  <small>{moment(notification.date).fromNow()}</small>
                </p>
              </div>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item disabled>No notifications found</Menu.Item>
        )
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <Badge count={notifications.length}>
        <BellOutlined style={{ fontSize: '24px', cursor: 'pointer', color: '#fff' }} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationBell;
