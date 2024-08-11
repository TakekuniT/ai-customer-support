// page.js
"use client";  // Add this line at the very top

import React, { useState } from "react";
import styles from "./page.module.css";
import { getGroqChatCompletion } from "./groqClient.js"; // Named import
import { SignedIn } from "./components/sign-in";
import { SignedOut } from "./components/sign-out";
import { auth } from "@/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, authLoading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user input to messages
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', text: input }
    ]);

    setLoading(true);

    try {
      // Pass user input to getGroqChatCompletion
      const response = await getGroqChatCompletion(input);

      // Update messages with response
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: response.choices[0]?.message?.content || 'No response found.' }
      ]);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: 'Error: Unable to fetch response.' }
      ]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <>
    <SignedIn>
    <div className={styles.nav}>
      <div className={styles.navBar}>
        <h1>Chat Support</h1>
        <button onClick={() => signOut()}>Log Out</button>
      </div>
     </div>
    <main className={styles.main}>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className={styles.message}>Loading...</div>}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={styles.input}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </main>
    </SignedIn>
    <SignedOut>
      <div className={styles.mainBackground}>
        <header className={styles.header}>
        <h1>Intelligent Conversation with AI</h1>
        <p>Explore the power of our advanced AI chatbot.</p>
      </header>

      <main className={styles.mainLanding}>
        <section className={styles.feature}>
          <div className={styles.featurecontent}>
            <h2>Engage in Natural Conversation</h2>
            <p>
              Designed to understand and respond to your messages quickly. 
              Experience seamless communication and get your questions answered efficiently.
            </p>
          </div>
        </section>

        <section className={styles.feature}>
        
          <div className={styles.featurecontent}>
            <h2>Personalized Assistance</h2>
            <p>
              Adapts to your unique needs and preferences, providing a tailored experience that caters to your specific requirements. 
              Get the support you need, whenever you need it.
            </p>
          </div>
        </section>
      </main>

      <section className={styles.cta}>
        <h2>Start Chatting with Our AI Today</h2>
        <a href="/login">Sign Up Now</a>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 AI Chatbot. All rights reserved.</p>
      </footer>
    </div>
    </SignedOut>
    </>
  );
}
