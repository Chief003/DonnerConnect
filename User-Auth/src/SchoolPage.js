import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import '../../App.css';
import Header from "../Header";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Form, Input, DatePicker, TimePicker, Typography, Space, Row, Col, message, Card } from 'antd';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useUserAuth } from '../../context/UserAuthContext'; // adjust import as needed

const { Title } = Typography;

const SchoolPage = () => {
  let { schoolName } = useParams();
  const [schoolData, setSchoolData] = useState(null);
  const [form] = Form.useForm();
  const { user } = useUserAuth(); // Assuming useUserAuth provides current user details

  const fetchSchoolData = async (schoolId) => {
    const schoolDocRef = doc(firestore, 'School', schoolId);
    try {
      const docSnap = await getDoc(schoolDocRef);
      if (docSnap.exists()) {
        setSchoolData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  useEffect(() => {
    if (schoolName) {
      fetchSchoolData(schoolName);
    }
  }, [schoolName]);

  const onFinish = async (values) => {
    try {
      const appointmentData = {
        schoolId: schoolName,
        ...values,
        dateTime: values.dateTime.format(),
        status: 'under review', // Add status field to indicate under review
        userId: user.uid, // Assuming user.uid is the unique ID of the logged-in user
        userName: `${user.firstName} ${user.lastName}`, // Assuming user.firstName and user.lastName are available
      };

      await addDoc(collection(firestore, 'appointments'), appointmentData);
      form.resetFields();
      message.success('Your appointment is under review. You will be notified when it is scheduled.');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      message.error('Failed to schedule appointment.');
    }
  };
  const disabledDate = (current) => {
    // Disable past dates and Sundays
    return current && (current < moment().startOf('day') || current.day() === 0);
  };

  const disabledTime = (current) => {
    const now = moment();
    
    // Disable times outside 8AM to 4PM starting from the day after today
    if (current && current.isAfter(now, 'day')) {
        return {
            disabledHours: () => {
                // Disable hours outside 8AM to 4PM
                return Array.from({ length: 24 }, (_, hour) => (hour < 8 || hour > 16) ? hour : undefined).filter(hour => hour !== undefined);
            },
            disabledMinutes: () => [],
            disabledSeconds: () => [],
        };
    }
    
    // Disable all times for the current day and past days
    return {
        disabledHours: () => Array.from({ length: 24 }, (_, hour) => true),
        disabledMinutes: () => Array.from({ length: 60 }, (_, minute) => true),
        disabledSeconds: () => Array.from({ length: 60 }, (_, second) => true),
    };
};

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("School Report", 14, 22);
    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Name', schoolData.Name],
        ['Location', schoolData.Location],
        ['Student Population', schoolData['Student Population']],
        ['Description', schoolData.description],
        ['Donations received', schoolData.donated],
      ],
    });

    doc.save(`${schoolData.Name}_Report.pdf`);
  };

  if (!schoolData) {
    return <div>Loading...</div>;
  }

  const mapContainerStyle = {
    height: '400px',
    width: '650px'
  };

  const center = {
    lat: schoolData.latitude,
    lng: schoolData.longitude
  };

  const backgroundStyle = {
    backgroundImage: `url(../images/hero_2.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'kalam',
    fontWeight: 'bold',
    color: '#000',
    fontSize: '100px',
    padding: '0 20px',
    boxSizing: 'border-box',
  };

  return (
    <>
      <Header />
      <div>
        {/* Background Image Section */}
        <div style={backgroundStyle}>
          <div className="text-white">
            <h1 className="mb-3">Causes</h1>
            <p className="lead" style={{fontSize:'1.9rem'}}>The various schools are all faced with their own unique challenges,<br></br> view each schools' needs and donate to whichever cause you wish to support.</p>
          </div>
        </div>

        {/* Featured Cause Section */}
        <div className="site-section" style={{ marginTop: '100px' }}>
          <div className="container">
            <div className="row mb-5 align-items-st">
              <div className="col-md-5">
                <div className="heading-20219">
                  <h2 className="title text-cursive mb-4">{schoolData.Name}</h2>
                  <p>Location: {schoolData.Location}</p>
                  <p>Student Population: {schoolData['Student Population']}</p>
                  <p>{schoolData.description}</p>
                  <p>
                    <Button type="primary" onClick={generatePDF}>
                      Download Report
                    </Button>
                  </p>
                  <p><a href="/mpesa" className="btn btn-primary rounded-0 px-4">Donate Now</a></p>
                </div>
              </div>
              <div className="col-md-7">
                <div className="cause shadow-sm">
                  <a href="#" className="cause-link d-block">
                    <img src="../images/hero_3.jpg" alt="Image" className="img-fluid" />
                  </a>
                  <div className="px-3 pt-3 border-top-0 border border shadow-sm">
                    <span className="badge-danger py-1 small px-2 rounded mb-3 d-inline-block"></span>
                    <h3 className="mb-4"><a href="#">{schoolData.Name}</a></h3>
                    <div className="border-top border-light border-bottom py-2 d-flex">
                      <div>Total Donated: </div>
                      <div className="ml-auto"><strong className="text-primary">kshs {schoolData.donated}</strong></div>
                    </div>
                    <div className="py-4">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Scheduling Form */}
            <Card title="Schedule an Appointment" style={{ width: '450px' }}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="reason"
                      label="Reason for Appointment"
                      rules={[{ required: true, message: 'Please enter reason for appointment' }]}
                    >
                      <Input.TextArea rows={4} placeholder="Enter reason for appointment" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="dateTime"
                      label="Date and Time"
                      rules={[{ required: true, message: 'Please select date and time' }]}
                    >
                      <DatePicker
                        disabledDate={disabledDate}
                        format="YYYY-MM-DD"
                        showTime={{ format: 'HH:mm', minuteStep: 15, defaultValue: moment().hours(8).minutes(0) }}
                        disabledTime={disabledTime}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  Schedule Appointment
                </Button>
              </Form>
            </Card>
          </div>
        </div>
        <div className="container" style={{marginLeft:'530px',marginTop:'-380px'}}>
          <LoadScript googleMapsApiKey="AIzaSyDtMMV8UeGPBT4XgxYGxhVGRUIjTXM2sMY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
};

export default SchoolPage;
