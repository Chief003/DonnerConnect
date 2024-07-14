import React, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext'; // Adjust the import path as needed
import { firestore } from '../firebase'; // Adjust the import path as needed
import { doc, updateDoc, increment, addDoc, collection, getDoc } from 'firebase/firestore';
import { message } from 'antd'; // Import message from Ant Design
import { Link } from 'react-router-dom';
import { Button } from 'antd';
const Mpesa = () => {
  const { user } = useUserAuth(); // Access user information from UserAuthContextProvider
  const [phone, setPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [messageText, setMessageText] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, accountNumber, amount }),
      });
      const data = await response.json();
      console.log(data);
      setMessageText('Request sent. Waiting for payment initiation...');

      // Simulate waiting for payment confirmation
      setTimeout(async () => {
        setMessageText('Payment successfully initiated!');

        // Update Firestore with donation amount for the school
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const schoolDocRef = doc(firestore, 'School', accountNumber);
          const donationAmount = parseFloat(amount);

          try {
            // Fetch the user's name from Firestore
            const userDoc = await getDoc(userDocRef);
            let userName = user.displayName || '';
            if (userDoc.exists()) {
              const userData = userDoc.data();
              userName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
            }

            // Update user's donations
            await updateDoc(userDocRef, {
              donations: increment(donationAmount)
            });
            console.log('User donation updated successfully!');

            // Ensure the `donated` field is correctly updated in the school's document
            await updateDoc(schoolDocRef, {
              donated: increment(donationAmount)
            });
            console.log('School donation updated successfully for', accountNumber);

            // Log the transaction
            const transactionData = {
              userId: user.uid,
              name: userName,
              email: user.email,
              amount: donationAmount,
              date: new Date(),
              schoolId: accountNumber,
            };

            const transactionsCollectionRef = collection(firestore, 'transactions');
            await addDoc(transactionsCollectionRef, transactionData);
            console.log('Transaction logged successfully!');

            // Show success message
            message.success('Thank you for your donation!');
          } catch (error) {
            console.error('Error updating Firestore:', error);
            setMessageText('Failed to update donation.');
          }
        } else {
          console.error('User not authenticated.');
          setMessageText('User not authenticated.');
        }

      }, 9000); // 9 seconds delay
    } catch (error) {
      console.error(error);
      setMessageText('Payment failed!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
      <Link to='/home' style={{ marginLeft: '315px' }}>
                <Button type="primary">Go to Home</Button>
              </Link>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1>Mpesa Payments</h1>
          {messageText && <p style={{ color: messageText.includes('failed') ? 'red' : 'green' }}>{messageText}</p>}
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>Phone Number</label>
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="accountNumber" style={styles.label}>Account Number</label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="amount" style={styles.label}>Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Pay Now</button>
        </form>
      </div>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Account Number</h2>
          <p style={styles.cardText}>The account number corresponds to the name of the school you are donating to.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url('/images/bg-5.jpg')`, // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: {
    maxWidth: '500px',
    flex: '1',
    padding: '20px',
    marginLeft:'300px',
  },
  cardContainer: {
    flex: '1',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added box shadow
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  card: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  cardText: {
    fontSize: '1rem',
  },
};

export default Mpesa;
