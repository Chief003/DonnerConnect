import React, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext'; // Adjust the import path as needed
import { firestore } from '../firebase'; // Adjust the import path as needed
import { doc, updateDoc, increment } from 'firebase/firestore';

const Mpesa = () => {
  const { user } = useUserAuth(); // Access user information from UserAuthContextProvider
  const [phone, setPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/stkpush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, accountNumber: accountNumber, amount: amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage('Request sent. Waiting for payment initiation...');
        
        // Simulate waiting for payment confirmation
        setTimeout(() => {
          setMessage('Payment successfully initiated!');

          // Update Firestore with donation amount for the school
          if (user) {
            const userDocRef = doc(firestore, 'users', user.uid);
            const schoolDocRef = doc(firestore, 'School', accountNumber);
            const donationAmount = parseFloat(amount);

            // Update user's donations
            updateDoc(userDocRef, {
              donations: increment(donationAmount)
            }).then(() => {
              console.log('User donation updated successfully!');
            }).catch((error) => {
              console.error('Error updating user donation:', error);
            });

            // Update school's donated amount
            updateDoc(schoolDocRef, {
              donated: increment(donationAmount)
            }).then(() => {
              console.log('School donation updated successfully for', accountNumber);
            }).catch((error) => {
              console.error('Error updating school donation:', error);
            });
          } else {
            console.error('User not authenticated.');
          }

        }, 9000); // 9 seconds delay
      })
      .catch((error) => {
        console.error(error);
        setMessage('Payment failed!');
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1>Mpesa Payment Form</h1>
          {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: {
    maxWidth: '400px',
    flex: '1',
    padding: '20px',
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
