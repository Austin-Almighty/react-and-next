'use client';
import React from 'react';
import './list.css';
import "./accounting.css"


interface ItemProps {
    option: string;
    amount: string;
    description: string;
    onDelete: () => void;
  }

interface ItemList {
    option: "income" | "expense";
    amount: string;
    description: string;
}

interface SumProps {
    items: ItemList[]
}



export function RenderItems({ option, amount, description, onDelete }: ItemProps) {
    return (
      <div className='list'>
        <div className='front'>
          <div className={option === "income" ? "income" : "expense"}>{option === "income" ? "+" + amount : "-" + amount}</div>
          <div className='des'>{description}</div>
        </div>
        <div className='back'>
          <button className='deleteBtn' onClick={onDelete}>刪除</button>
        </div>
      </div>
    );
}

export function Sum({ items }: SumProps) {

    const sum = items.reduce((total, item)=> item.option === "income" ? total + Number(item.amount) : total - Number(item.amount), 0)
    return (
      <div className="sum">
        <div>小計： {sum}</div>
      </div>
    );
  }