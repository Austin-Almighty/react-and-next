"use client";
import React, {useEffect, useState} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from "../fireBaseConfig"


import "./index.css";
import { Dashboard, LoginForm, RegisterForm } from "./login";

export default function Home() {
const [loginEmail, setLoginEmail] = useState<string>("");
const [loginPassword, setLoginPassword] = useState<string>("");
const [registerEmail, setRegisterEmail] = useState<string>("");
const [registerPassword, setRegisterPassword] = useState<string>("");
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const signedOut = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
  });
  return () => signedOut();
}, []);

  return (
    <>
      <header>
        <div>React練習專案</div>
      </header>
      <main>
        <div>歡迎光臨我的頁面</div>
      </main>
      
      <section className='loginSection'>
        <div className='loginImport'>
          {user ? <Dashboard email={user.email ?? "查無email"}/> : <LoginForm loginEmail={loginEmail} loginPassword={loginPassword} setLoginEmail={setLoginEmail} setLoginPassword={setLoginPassword}/>}
          <RegisterForm registerEmail={registerEmail} registerPassword={registerPassword} setRegisterEmail={setRegisterEmail} setRegisterPassword={setRegisterPassword}/>
        </div>
      </section>
    </>
  );
}


