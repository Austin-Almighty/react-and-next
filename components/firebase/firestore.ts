import { db } from '../../../fireBaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, DocumentReference } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../fireBaseConfig';


interface transaction {
    id: string;
    amount: string;
    description: string;
    option: 'income' | 'expense';
}

// Add a new transaction
export async function addTransaction(transaction: Omit<transaction, 'id'>): Promise<DocumentReference> {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), transaction);
    return docRef;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};


export async function fetchTransactions(): Promise<transaction[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    const transactions: transaction[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        amount: data.amount,
        description: data.description,
        option: data.type
      };
    });
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

// Delete a transaction
export async function deleteTransaction(transactionId: string) {
  try {
    const transactionDoc = doc(db, 'transactions', transactionId);
    await deleteDoc(transactionDoc);
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};


export async function signUp(email:string, password:string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // User signed up successfully
  } catch (error) {
    console.error('Error signing up:', error);
  }
};



export const signIn = async (email:string, password:string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // User signed in successfully
  } catch (error) {
    console.error('Error signing in:', error);
  }
};


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
  } else {
    // User is signed out
  }
});