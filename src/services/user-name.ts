import { USER_EMAIL_KEY_NAME } from '../const';

export type UserName = string;

export const getUserName = (): string => {
  const userEmail = localStorage.getItem(USER_EMAIL_KEY_NAME);
  return userEmail ?? '';
};

export const saveUserName = (email: string) => {
  localStorage.setItem(USER_EMAIL_KEY_NAME, email);
};

export const dropUserName = (): void => {
  localStorage.removeItem(USER_EMAIL_KEY_NAME);
};
