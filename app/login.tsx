'use client';
import React from 'react';
import { signIn, signUp, signOutUser } from './firebase/firestore';
import { auth } from '../fireBaseConfig';
import Link from "next/link";

interface LoginFormProps {
    loginEmail: string;
    loginPassword: string;
    setLoginEmail: (value: string) => void;
    setLoginPassword: (value: string) => void;
}

export function LoginForm({loginEmail, loginPassword, setLoginEmail, setLoginPassword}: LoginFormProps) {
    return(
        <>
            <h3>登入系統</h3>
            <form>
                <div className='formDiv'>
                    <label htmlFor="loginEmail">電郵：</label>
                    <input
                    className="login"
                    type="email"
                    id="loginEmail"
                    name="email"
                    value={loginEmail}
                    onChange={(e)=>setLoginEmail(e.target.value)}
                    required
                    />
                </div>
                <div className='formDiv'> 
                    <label htmlFor="loginPassword">密碼：</label>
                    <input
                    className="login"
                    type="password"
                    id="loginPassword"
                    name="password"
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="button" className='loginBtn' onClick={()=>signIn(auth, loginEmail, loginPassword)}>登入</button>
            </form>
        </>
    )
}

interface registerProps {
    registerEmail: string;
    registerPassword: string;
    setRegisterEmail: (value:string) => void;
    setRegisterPassword: (value: string) => void;
}

export function RegisterForm({registerEmail, registerPassword, setRegisterEmail, setRegisterPassword}:registerProps) {
    return (
        <>
            <h3>註冊帳戶</h3>
                <form>
                    <div className='formDiv'>
                        <label htmlFor='registerEmail'>電郵：</label>
                        <input
                        className='login'
                        type='email'
                        id='registerEmail'
                        name='email'
                        value={registerEmail}
                        onChange={(e)=>setRegisterEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className='formDiv'>
                        <label htmlFor='registerPassword'>密碼：</label>
                        <input
                        className='login'
                        type='password'
                        id="registerPassword"
                        name='password'
                        value={registerPassword}
                        required
                        onChange={(e)=>setRegisterPassword(e.target.value)}
                        minLength={6}
                        />
                        <div className='password-length'>密碼長度需至少六個字元</div>
                    </div>
                    <button type='button' className='registerBtn' onClick={()=>signUp(auth, registerEmail, registerPassword)}>註冊</button>

                </form>
        </>
    )
}

export function Dashboard({ email }: { email: string }) {
    return (
        <div className='dashboard'>
            <h3>您已經使用{email}登入</h3>
            <Link href='/accounting'>
                <button type="button">立即開始</button>
            </Link>
            <button type='button' onClick={() => signOutUser(auth)}>登出</button>
        </div>
    )
}