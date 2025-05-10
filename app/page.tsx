"use client";
import React from 'react';
import { useState } from 'react';
import Link from "next/link";

import "./index.css";
// import { LoginForm } from "./login";

export default function Home() {


  

  return (
    <>
      <header>
        <div>React練習專案</div>
      </header>
      <main>
        <div>歡迎光臨我的頁面</div>
      </main>
      <section>
        <Link href='/accounting'>
          <button className="start">點此開始</button>
        </Link>
      </section>
     
    </>
  );
}


