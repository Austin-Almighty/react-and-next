'use client';
import React from 'react';
import './accounting.css';
import Link from "next/link";
import {Selector, Amount, Description, SubmitBtn} from './form';
import { useState, useEffect } from 'react';
import { RenderItems, Sum } from './list';
import { addTransaction, fetchTransactions, deleteTransaction } from '../firebase/firestore';



export default function Accounting() {
    const [option, setOption] = useState<"expense" | "income">('expense');
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [items, setItems] = useState<{ id: string; option: "income" | "expense"; amount: string; description: string }[]>([]);

    useEffect(()=>{
      async function loadTransactions() {
        const transactions = await fetchTransactions();
        setItems(transactions);
      };
      loadTransactions();
    }, []);


    async function onSubmit() {
      const newTransaction: Omit<{ id: string; option: "income" | "expense"; amount: string; description: string }, 'id'> = {
        option,
        amount,
        description
      };
      const docRef = await addTransaction(newTransaction);
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
