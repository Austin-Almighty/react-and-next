// 'use client';
// import React from 'react';
// import { signIn, signUp } from './components/firebase/firestore';

// export function LoginForm({loginEmail: string, loginPassword: string, registerEmail: string, registerPassword: string}) {
//     return(
//         <>
//             <div className='loginImport'>
//                 <h3>登入系統</h3>
//                 <form>
//                     <div className='formDiv'>
//                         <label htmlFor="loginEmail">電郵：</label>
//                         <input
//                         className="login"
//                         type="email"
//                         id="loginEmail"
//                         name="email"
//                         value={loginEmail}
//                         required
//                         />
//                     </div>
//                     <div className='formDiv'> 
//                         <label htmlFor="loginPassword">密碼：</label>
//                         <input
//                         className="login"
//                         type="password"
//                         id="loginPassword"
//                         name="password"
//                         value={loginPassword}
//                         required
//                         />
//                     </div>
//                     <button type="button" className='loginBtn' onClick={()=>signIn(loginEmail, loginPassword)}>登入</button>
//                 </form>

//                 <h3>註冊帳戶</h3>
//                 <form>
//                     <div className='formDiv'>
//                         <label htmlFor='registerEmail'>電郵：</label>
//                         <input
//                         className='login'
//                         type='email'
//                         id='registerEmail'
//                         name='email'
//                         value={registerEmail}
//                         required
//                         />
//                     </div>
//                     <div className='formDiv'>
//                         <label htmlFor='registerPassword'>密碼：</label>
//                         <input
//                         className='login'
//                         type='password'
//                         id="registerPassword"
//                         name='password'
//                         value={registerPassword}
//                         required
//                         />
//                     </div>
//                     <button type='button' className='registerBtn' onClick={()=>signUp(registerEmail, registerPassword)}>註冊</button>
//                 </form>
//             </div>
//         </>
//     )
// }