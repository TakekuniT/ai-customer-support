"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCreateUserWithEmailAndPassword, 
  useSendEmailVerification, } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

export default function Page() {

  const router = useRouter(); 
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmit = async () => {
    await createUser(email, password);
    await sendEmailVerification();
    router.push('/');
  }

  return (
    <div>

    </div>
  )
}