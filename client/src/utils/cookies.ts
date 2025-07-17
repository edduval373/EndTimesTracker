export function setCookie(name: string, value: string, days: number = 365) {
  const isProduction = window.location.protocol === 'https:';
  const maxAge = days * 24 * 60 * 60; // Convert days to seconds
  const cookieString = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${isProduction ? '; Secure' : ''}`;
  document.cookie = cookieString;
  
  // Also set in localStorage as fallback
  localStorage.setItem(name, value);
}

export function getCookie(name: string): string | null {
  // Try cookie first
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(cookie => cookie.trim().startsWith(`${name}=`));
  
  if (cookie) {
    return cookie.split('=')[1];
  }
  
  // Fallback to localStorage
  return localStorage.getItem(name);
}

export function deleteCookie(name: string) {
  const isProduction = window.location.protocol === 'https:';
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${isProduction ? '; Secure' : ''}`;
  
  // Also remove from localStorage
  localStorage.removeItem(name);
}

export function hasUserCookie(): boolean {
  return getCookie('user_id') !== null;
}