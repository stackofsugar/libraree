import type { Route } from './+types/home';
import { Link, redirect, useNavigation } from 'react-router';
import { tokenMiddleware } from '~/middleware/auth';
import { Form } from 'react-router';

import title from '~/lib/title';
import libraree from '~/assets/libraree.svg';
import { apiCall } from '~/lib/api';

export function meta({}: Route.MetaArgs) {
  return title('Home');
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const result = await apiCall('get', 'me');
  console.log(result);
  return result;
}

export async function clientAction({ request, context }: Route.ActionArgs) {
  const result = await apiCall('post', 'logout');
  localStorage.removeItem('user');
  throw redirect('/login');
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [tokenMiddleware];

export default function Home({ loaderData }: Route.ComponentProps) {
  const result = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === '/';

  return (
    <div className="text-center">
      <div className="mb-4">Hello, {result?.data.name}!</div>
      <div>
        <Link to="/borrow" className="btn btn-primary">
          Borrow a Book
        </Link>
      </div>
      {result?.data.is_admin && (
        <>
          <div className="mt-5">
            <Link to="/book" className="btn btn-primary">
              Add New Book
            </Link>
          </div>
          <div className="mt-2">
            <Link to="/user" className="btn btn-primary">
              Add New User
            </Link>
          </div>
          <div className="mt-2">
            <Link to="/track" className="btn btn-primary">
              Track Returned Books
            </Link>
          </div>
        </>
      )}
      <div className="mt-5">
        <Form method="post">
          <button type="submit" className="btn btn-warning">
            Log Out
          </button>
        </Form>
      </div>
    </div>
  );
}
