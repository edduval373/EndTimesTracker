import { useState, useEffect } from 'react';

export function useUserCookie() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user cookie
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user_id='));
    
    if (userCookie) {
      const userIdValue = userCookie.split('=')[1];
      setUserId(userIdValue);
    }
    
    setIsLoading(false);
  }, []);

  const hasUserCookie = userId !== null;

  const clearUserCookie = () => {
    document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUserId(null);
  };

  return {
    userId,
    hasUserCookie,
    isLoading,
    clearUserCookie
  };
}