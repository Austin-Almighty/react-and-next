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
const [loading, setLoading] = useState(true);

useEffect(() => {
  const signedOut = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
    setLoading(false);
  });
  return () => signedOut();
}, []);

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg text-gray-600">載入中，請稍候...</p>
    </div>
  );
}

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
