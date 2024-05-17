import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function UpdateProfile() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [currentProfileImage, setCurrentProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUsername(userData.username);
        setRole(userData.role);
        setCurrentProfileImage(userData.profileImage);
      } else {
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('role', role);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch('/api/auth/upload-profile', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsername(updatedUser.username);
        setRole(updatedUser.role);
        setCurrentProfileImage(updatedUser.profileImage);
        setError(null);
        alert('프로필이 업데이트되었습니다.');
        router.push('/profile');
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (error) {
      setError('서버 에러가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  const handleDeleteProfileImage = async () => {
    try {
      const response = await fetch('/api/auth/delete-profile', {
        method: 'DELETE',
      });

      if (response.ok) {
        setCurrentProfileImage(null);
        setError(null);
        alert('프로필 이미지가 삭제되었습니다.');
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (error) {
      setError('서버 에러가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      {currentProfileImage ? (
        <img src={currentProfileImage} alt="Profile Image" width={150} height={150} />
      ) : (
        <img src="/default-profile.png" alt="Default Profile" width={150} height={150} />
      )}
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
        <button type="submit">Update Profile</button>
      </form>
      {currentProfileImage && (
        <button onClick={handleDeleteProfileImage}>Delete Profile Image</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

