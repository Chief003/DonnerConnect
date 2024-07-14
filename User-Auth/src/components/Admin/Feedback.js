import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd'; // Import Card component from Ant Design
import { firestore } from '../../firebase'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]); // State for storing feedback data
    const [loading, setLoading] = useState(true); // State for loading status

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const feedbackCollectionRef = collection(firestore, 'feedback');
                const feedbackSnapshot = await getDocs(feedbackCollectionRef);
                const feedbackData = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFeedbacks(feedbackData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedback from Firestore:', error);
                message.error('Failed to load feedback.');
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{backgroundImage: `url('/images/sc3.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight:'100vh', display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',}}>
        <div className="col-lg-12 mt-5" style={{ marginLeft: '10px', marginBottom: '10px', width: '700px' }}>
        <Link to='/admin' style={{ marginLeft: '575px' }}>
                <Button type="primary">Go to Profile</Button>
              </Link>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff',fontFamily:'sans-serif' }}>User Feedback</h2>
            <div className="feedback-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {feedbacks.map(feedback => (
                    <Card
                        key={feedback.id}
                        title={feedback.userName}
                        style={{ marginBottom: '20px' }}
                    >
                        <p><strong>Rating:</strong> {feedback.rating}</p>
                        <p><strong>Feedback:</strong> {feedback.feedback}</p>
                        <p><strong>Date:</strong> {new Date(feedback.date.seconds * 1000).toLocaleDateString()}</p>
                    </Card>
                ))}
            </div>
        </div>
        </div>
    );
};

export default FeedbackList;
