"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import styles from './login.module.css';

export default function Page() {

  const router = useRouter(); 
  const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmit = async () => {
    await signInUserWithEmailAndPassword(email, password);
    router.push('/');
  }

  return (
    <main className={styles.pageBody}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.text}>Login</div>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <img src="email-icon.png"/>
            <input type="email" placeholder="Email"
            value={email} required
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <img src="lock-icon.png" />
            <input type="password" placeholder="Password" 
            value={password} required
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.forgotPassword}>
          Forgot Password? <span onClick={() => router.push('./forgot-password')}>Click Here!</span>
        </div>
        <div className={styles.submitContainer}>
          <div className={styles.submit}>
            <button className={styles.btn}
            onClick={() => onSubmit()}
            disabled={!email || !password}
            >
              Login
              </button>
          </div>
          <div className={styles.signUp}>
            Don't have an account? <span onClick={() => router.push('/sign-up')}> Sign Up!</span>
          </div>
        </div>
      </div>
    </main>
  )
}