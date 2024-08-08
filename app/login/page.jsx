"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

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
    <div>

    </div>
  )
}