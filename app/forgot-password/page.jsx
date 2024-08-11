"use client";
import {useState} from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import styles from './forgotPassword.module.css';

export default function ForgotPassword (){
  const [email, setEmail] = useState('');
  const router = useRouter();
  const resetEmail = () => {
    sendPasswordResetEmail(auth, email)
    router.push('/signin')
  }

  return (
    <main className={styles.pageBody}>
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>Password Reset</div>
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
      </div>
      <div className={styles.submitContainer}>
        <div className={styles.submit}>
          <button className={styles.btn}
          onClick={() => resetEmail()}
          disabled={!email}
          >
            Reset
            </button>
        </div>
        <div className={styles.signUp}>
          Don't have an account? <span onClick={() => router.push('/sign-up')}>Click Here!</span>
        </div>
      </div>
    </div>
  </main>
  );
}