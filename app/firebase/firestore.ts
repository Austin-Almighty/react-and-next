import { db } from '../../fireBaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, DocumentReference } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../fireBaseConfig';


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

