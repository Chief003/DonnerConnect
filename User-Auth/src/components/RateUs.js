import React, { useState, useEffect } from 'react';
import { Rate, message } from 'antd'; // Import Rate and message components from Ant Design
import { useUserAuth } from '../context/UserAuthContext'; // Adjust the import path as needed
import { firestore } from '../firebase'; // Adjust the import path as needed
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';

const RateUs = () => {
    const { user } = useUserAuth(); // Access user information from UserAuthContextProvider
    const [rating, setRating] = useState(0); // State for user's rating
    const [feedback, setFeedback] = useState(''); // State for feedback text
    const [averageRating, setAverageRating] = useState(0); // State for average rating
    const [totalRatings, setTotalRatings] = useState(0); // State for total number of ratings
    const [userName, setUserName] = useState(''); // State for user's name

    useEffect(() => {
        // Fetch all ratings from Firestore and calculate the average rating
        const fetchRatings = async () => {
            const ratingsCollectionRef = collection(firestore, 'feedback');
            const ratingsSnapshot = await getDocs(ratingsCollectionRef);
            const ratingsData = ratingsSnapshot.docs.map(doc => doc.data());
            const totalRatingsCount = ratingsData.length;
            const sumOfRatings = ratingsData.reduce((sum, rating) => sum + rating.rating, 0);
            const avgRating = totalRatingsCount ? (sumOfRatings / totalRatingsCount) : 0;
            setTotalRatings(totalRatingsCount);
            setAverageRating(avgRating);
        };

        fetchRatings();

        // Fetch the user's name based on userId
        const fetchUserName = async () => {
            if (user) {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserName(`${userData.firstName} ${userData.lastName}`);
                }
            }
        };

        fetchUserName();
    }, [user]);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            const ratingsCollectionRef = collection(firestore, 'feedback');
            const ratingData = {
                userId: user.uid,
                userName,
                rating,
                feedback,
                date: new Date(),
            };

            try {
                await addDoc(ratingsCollectionRef, ratingData);
                message.success('Thank you for your feedback!');
                setRating(0);
                setFeedback('');
                // Fetch ratings again to update the average rating and total ratings count
                const ratingsSnapshot = await getDocs(ratingsCollectionRef);
                const ratingsData = ratingsSnapshot.docs.map(doc => doc.data());
                const totalRatingsCount = ratingsData.length;
                const sumOfRatings = ratingsData.reduce((sum, rating) => sum + rating.rating, 0);
                const avgRating = totalRatingsCount ? (sumOfRatings / totalRatingsCount) : 0;
                setTotalRatings(totalRatingsCount);
                setAverageRating(avgRating);
            } catch (error) {
                console.error('Error adding rating to Firestore:', error);
                message.error('Failed to submit feedback.');
            }
        } else {
            message.error('User not authenticated.');
        }
    };

    return (
        <div className="col-lg-12 mt-5" style={{ marginLeft: '50px', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>Rate Us</h2>
            <div style={{ marginBottom: '1rem' }}>
                <Rate onChange={handleRatingChange} value={rating} />
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <textarea
                        rows={4}
                        placeholder="Tell us about your experience..."
                        value={feedback}
                        onChange={handleFeedbackChange}
                        style={{ width: '70%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
            <div style={{ marginTop: '2rem' }}>
                <h3>Average Rating: {averageRating.toFixed(1)} / 5</h3>
                <p>Total Ratings: {totalRatings}</p>
            </div>
        </div>
    );
};

export default RateUs;
