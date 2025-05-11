import { db} from '../../fireBaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, DocumentReference } from 'firebase/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


interface transaction {
    id: string;
    amount: number;
    description: string;
    option: 'income' | 'expense';
    userId: string;
}

// Add a new transaction
export async function addTransaction(
  transaction: Omit<transaction, 'id' | 'userId'>,
  userId: string
): Promise<DocumentReference> {
  try {
    const rawAmount = Number(transaction.amount);
    const finalTransaction = {
      ...transaction,
      amount: transaction.option === "income" ? Math.abs(rawAmount) : -Math.abs(rawAmount),
      userId
    };

    const docRef = await addDoc(collection(db, 'transactions'), finalTransaction);
    return docRef;

  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};


export async function fetchTransactions(userId: string): Promise<transaction[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    const transactions: transaction[] = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          amount: Number(data.amount),
          description: data.description,
          option: data.option,
          userId: data.userId
        };
      })
      .filter(transaction => transaction.userId === userId);
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

export async function signIn(auth: Auth, email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential) alert("查無此帳號");
    const user = userCredential.user;
    //Change state to login
    console.log(user);
  } catch (error: any) {
    console.log(error.message);
  }
}



export async function signUp(auth: Auth, email: string, password: string): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("註冊成功！請於上方登入");
    console.log(`帳號${user}註冊成功`)
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function signOutUser(auth: Auth): Promise<void> {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error: any) {
    console.log(error.message);
  }
}
