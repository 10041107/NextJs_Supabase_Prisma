import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css'; 

interface User {
  id: number;
  username: string;
  role: string;
  profileImage?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser({
          ...userData,
          profileImage: userData.profileImage ? `${userData.profileImage}?${Date.now()}` : null
        });
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

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile Page</h1>
      <div className={styles.profileImageContainer}>
        {user.profileImage ? (
          <img src={user.profileImage} alt="Profile Image" className={styles.profileImage} />
        ) : (
          <img src="/default-profile.png" alt="Default Profile" className={styles.profileImage} />
        )}
      </div>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

