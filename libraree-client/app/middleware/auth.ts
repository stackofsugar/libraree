import { redirect } from 'react-router';

export const tokenMiddleware = () => {
  if (!localStorage.getItem('user')) {
    throw redirect('/login');
  }
};
