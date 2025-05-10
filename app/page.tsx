"use client";
import React from 'react';
import { useState } from 'react';
import Link from "next/link";

import "./index.css";
// import { LoginForm } from "./login";

export default function Home() {
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  

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
      {/* <div className="loginSection">
        <LoginForm loginEmail={loginEmail} loginPassword={loginPassword} registerEmail={registerEmail} registerPassword={registerPassword}/>
      </div> */}
    </>
  );
}


