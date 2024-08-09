// page.js
"use client";  // Add this line at the very top

import React, { useState } from "react";
import styles from "./page.module.css";
import { getGroqChatCompletion } from "./groqClient.js"; // Named import

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
  );
}
