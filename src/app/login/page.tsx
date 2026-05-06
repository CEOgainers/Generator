"use client";

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this should be an API call to avoid exposing credentials to the client.
    // However, since we're using static environment variables for a simple lock, 
    // we'll authenticate via a server action or simple client check for now.
    
    // For enhanced security, we should really do this via an API route, 
    // but here we are sending a request to our API to verify.
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Set cookie and redirect
        Cookies.set('auth_token', data.token, { expires: 7 }); // Expires in 7 days
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    })
    .catch(() => {
      setError('An error occurred during login');
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid var(--border-color)'
      }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '24px', textAlign: 'center' }}>System Access</h1>
        
        {error && (
          <div style={{ 
            color: '#ef4444', 
            backgroundColor: '#fee2e2', 
            padding: '12px', 
            borderRadius: '6px', 
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <button 
            type="submit" 
            className={styles.primaryBtn}
            style={{ marginTop: '10px', padding: '12px', width: '100%' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
