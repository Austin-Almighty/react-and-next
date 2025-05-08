'use client';
import React from 'react';

type Option = "income" | "expense";
interface SelectorProps {
    option: Option;
    setOption: (value: Option) => void;
}

interface AmountProps {
    amount: string;
    setAmount: (value: string) => void;
}

interface DescriptionProps {
    description: string;
    setDescription: (value: string) => void;
}

interface SubmitBtnProps {
    option:Option;
    amount: string;
    description: string
    setAmount: (value: string) => void;
    setDescription: (value: string) => void;
    onSubmit: (option: Option, amount: string, description: string) => void;
}


export function Selector({option, setOption}:SelectorProps) {
    return(
        <>
            <select value={option} onChange={(e)=> setOption(e.target.value as Option)}>
                <option value="income">收入</option>
                <option value="expense">支出</option>
            </select>
        </>
   );
}

export function Amount({amount, setAmount}: AmountProps) {
    return(
        <>
            <input type="number" inputMode='numeric' id='amount' placeholder='金額' value={amount === undefined?"":amount} onChange={(e)=>setAmount(e.target.value)}></input>
        </>
    )
}

export function Description({description, setDescription}: DescriptionProps) {
    return(
        <>
            <input type='text' id="description" placeholder='紀錄描述' value={description} onChange={e=>setDescription(e.target.value)}></input>
        </>
    )
}


export function SubmitBtn({ option, amount, description, setAmount, setDescription, onSubmit}:SubmitBtnProps) {
    const handleClick = () => {
      if (!amount || !description) {
        alert("請填寫所有欄位");
        return;
      }
      onSubmit(option, amount, description); // send data up through react hook
      setAmount(""); // clears both fields after submission
      setDescription('');
    };
  
    return <button id="submitBtn" onClick={handleClick}>新增紀錄</button>;
  }