import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('public');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        // 로그인된 상태라면 메인 페이지로 리디렉션
        router.push('/');
      } else {
        // 로그인되지 않은 상태라면 로딩 완료
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [router]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      router.push('/login');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div>
        <label htmlFor="profileImage">Profile Image:</label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

