'use client';
import React from 'react';
import './accounting.css';
import Link from "next/link";
import {Selector, Amount, Description, SubmitBtn} from './form';
import { useState, useEffect } from 'react';
import { RenderItems, Sum } from './list';
import { addTransaction, fetchTransactions, deleteTransaction} from '../firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Accounting() {
    const auth = getAuth();
    const router = useRouter();
    const userId = auth.currentUser?.uid;

    const [option, setOption] = useState<"expense" | "income">('expense');
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [items, setItems] = useState<{ id: string; option: "income" | "expense"; amount: number; description: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const transactions = await fetchTransactions(user.uid);
          setItems(transactions);
          setLoading(false);
        } else {
          router.replace('/');
        }
      });

      return () => unsubscribe();
    }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg text-gray-600">載入中，請稍候...</p>
      </div>
    );
  }

    async function onSubmit() {
      const parsedAmount = Math.abs(Number(amount));
      const finalAmount = option === "income" ? parsedAmount : -parsedAmount;

      const newTransaction: Omit<{ id: string; option: "income" | "expense"; amount: number; description: string }, 'id'> = {
        option,
        amount: finalAmount,
        description
      };
      const docRef = await addTransaction(newTransaction, userId!);
      setItems((prevItems) => [
        ...prevItems,
        { id: docRef.id, ...newTransaction }
      ]);
      setAmount('');
      setDescription('');
    };

    async function onDelete(index: number) {
      const itemToDelete = items[index];
      await deleteTransaction(itemToDelete.id);
      setItems(existing => existing.filter((_, i) => i !== index));
    };

  return (
    <>  
        <div className='formSection'>
            <Selector option={option} setOption={setOption}/>
            <Amount amount={amount} setAmount={setAmount}/>
            <Description description={description} setDescription={setDescription}/>
            <SubmitBtn option={option} amount={amount} description={description} setAmount={setAmount} setDescription={setDescription} onSubmit={onSubmit}/>
        </div>
        <hr></hr>
        <div className='itemsList'>
        {items.map((item, index) => (
          <RenderItems
            key={index}
            option={item.option}
            amount={item.amount}
            description={item.description}
            onDelete={()=>onDelete(index)}
          />
        ))}
        </div>
        <Sum items={items}/>
        <section>
          <Link href='/'>
            <button id="homepageBtn">返回首頁</button>
          </Link>
        </section>
        
    </>
  )
}
