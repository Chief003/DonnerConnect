// services/paymentService.js
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const savePaymentDetails = async (userId, paymentDetails) => {
  const paymentRef = doc(firestore, `users/${userId}/paymentDetails`);
  try {
    await setDoc(paymentRef, paymentDetails);
    console.log('Payment details saved successfully!');
  } catch (error) {
    console.error('Error saving payment details:', error.message);
    throw new Error('Failed to save payment details');
  }
};

export { savePaymentDetails };
