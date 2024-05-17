import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (response.ok) {
      alert('비밀번호가 변경되었습니다.');
      router.push('/profile');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <div>
        <label htmlFor="currentPassword">현재 비밀번호:</label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div>
        <label htmlFor="newPassword">새 비밀번호:</label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
}

