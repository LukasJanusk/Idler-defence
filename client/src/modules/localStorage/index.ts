import { parseUser, type User } from '@/modules/user/schema';

export const getLocalStorageUser = () => {
  try {
    const localUser = localStorage.getItem('user');
    if (!localUser) return null;
    const user = parseUser(JSON.parse(localUser));
    return user;
  } catch (err) {
    console.error(
      err instanceof Error
        ? err.message
        : 'Failed to get user data from local storage',
    );
    return null;
  }
};

export const setLocalStorageUser = (user: User) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : 'Local storage error setting user',
    );
  }
};

export const removeLocalUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
};

export const setAccessToken = (token: string) => {
  try {
    localStorage.setItem('accessToken', token);
    return true;
  } catch (err) {
    console.error(
      err instanceof Error
        ? err.message
        : 'Failed to get access token from local storage',
    );
    return false;
  }
};
