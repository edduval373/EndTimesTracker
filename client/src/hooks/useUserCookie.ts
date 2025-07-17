import { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from '@/utils/cookies';

export function useUserCookie() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user cookie
    const userIdFromCookie = getCookie('user_id');
    
    console.log('Cookie check:', {
      allCookies: document.cookie,
      userIdFromCookie,
      hasUserCookie: userIdFromCookie !== null
    });
    
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    }
    
    setIsLoading(false);
  }, []);

  const hasUserCookie = userId !== null;

  const clearUserCookie = () => {
    deleteCookie('user_id');
    setUserId(null);
  };

  return {
    userId,
    hasUserCookie,
    isLoading,
    clearUserCookie
  };
}