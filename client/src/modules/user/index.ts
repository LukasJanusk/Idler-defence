import config from '@/config';
import {
  parseUser,
  type LoginData,
  type SignupData,
  type Token,
  type User,
} from './schema';
import { setAccessToken } from '../localStorage';
import type { LoginResponse } from './types';

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${config.apiUrl}/user/login`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
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

export const signUp = async (
  formData: SignupData,
  onSuccess?: () => void,
  onError?: () => void,
): Promise<User> => {
  try {
    const response = await fetch(`${config.apiUrl}/user`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const user = parseUser(data);
    onSuccess?.();
    return user;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Failed to sign up');
    onError?.();
    throw err;
  }
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
