import config from '@/config';
import { type LoginData, type Token } from './schema';
import { setAccessToken } from '../localStorage';
import type { LoginResponse } from './types';

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(new URL('/user/login', config.apiUrl).href, {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const token: Token = await response.json();
    setAccessToken(token);

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Error occured logging in, please try again.';
    console.error(message);

    return { success: false, error: message };
  }
};

export const signUp = () => {
  console.warn('Not yet implemented');
};

export const logout = () => {
  console.warn('Not yet implemented');
};

export const remove = () => {
  console.warn('Not yet implemented');
};

export const edit = () => {
  console.warn('Not yet implemented');
};
