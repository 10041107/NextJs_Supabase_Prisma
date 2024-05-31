import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Link from "next/link";

const Home: React.FC = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  const navigateToProfile = () => {
    router.push('/profile');
  };

  const navigateToChangePassword = () => {
    router.push('/change-password');
  };

  const navigateToUpdateProfile = () => {
    router.push('/update-profile');
  };

  const movePlayground = () => {
    router.push('/playground');
  };

  
  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };


// === 파이썬 코드 호출
  const [message, setMessage] = useState('');

  const callApi = async () => {
    try {
      const response = await fetch('/api/python');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('Error fetching data');
    }
  };


  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
      <button onClick={callApi} className="font-mono font-bold">
        Call API
      </button>
      {message && <p>{message}</p>}
      <button className={styles.button} onClick={movePlayground}>playground</button>
      <button className={styles.button} onClick={navigateToRegister}>Register</button>
      <button className={styles.button} onClick={navigateToLogin}>Login</button>
      <button className={styles.button} onClick={handleLogout}>Logout</button>
      <button className={styles.button} onClick={navigateToProfile}>Profile</button>
      <button className={styles.button} onClick={navigateToChangePassword}>Change Password</button>
      <button className={styles.button} onClick={navigateToUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default Home;
