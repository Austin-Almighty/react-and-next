'use client';
import React from 'react'
import Link from "next/link";
import './accounting.css';
import {Selector, Amount, Description, SubmitBtn} from './form'
import { useState } from 'react';
import { RenderItems, Sum } from './list';




const accounting = () => {
    const [option, setOption] = useState<"expense" | "income">('expense');
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [items, setItems] = useState<{option: "income" | "expense", amount:string, description: string}[]>([]);
    const onSubmit = (option: "income" | "expense", amount:string, description: string) => {
      setItems(existing => [...existing, { option, amount, description }]);
    };
    const onDelete = (index:number) => {
      setItems(existing => existing.filter((_, i) => i !== index))
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
          <Link href='/accounting'>
            <button id="homepageBtn">返回首頁</button>
          </Link>
        </section>
        
    </>
  )
}

export default accounting