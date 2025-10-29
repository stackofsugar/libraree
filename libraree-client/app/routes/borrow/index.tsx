import type { Route } from '../borrow/+types/index';
import { Form, Link, redirect, useNavigation } from 'react-router';
import { apiCall } from '~/lib/api';

import title from '~/lib/title';
import { tokenMiddleware } from '~/middleware/auth';

export function meta({}: Route.MetaArgs) {
  return title('Borrow');
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [tokenMiddleware];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const result = await apiCall('get', 'borrows');
  console.log(result);
  return result;
}

export async function clientAction({ request, context }: Route.ActionArgs) {
  const result = await apiCall('post', 'borrows/return');
  return redirect('/borrow');
}

export default function BorrowIndex({ loaderData, actionData }: Route.ComponentProps) {
  const result = loaderData;
  const { book_title, return_date } = loaderData.data;
  const errors = actionData || {};
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === '/borrow';

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="card bg-base-200 w-80 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Your Active Book Loan</h2>
            <div className="flex flex-col gap-1">
              {result.success ? (
                Object.keys(result.data).length !== 0 ? (
                  <>
                    <div>
                      <span className="font-bold">Title:</span> {book_title}
                    </div>
                    <div>
                      <span className="font-bold">Return At:</span> {return_date}
                    </div>
                  </>
                ) : (
                  <div>You have no active loans</div>
                )
              ) : (
                <div className="text-error">API Error: {result.error.message}</div>
              )}
            </div>
          </div>
        </div>
        {result.success && Object.keys(result.data).length !== 0 ? (
          <Form method="post">
            <button type="submit" className="mt-5 w-full btn btn-primary" disabled={isSubmitting}>
              Return Book
            </button>
          </Form>
        ) : (
          <Link to="/borrow/new" className="mt-5 text-center btn btn-primary">
            Borrow a Book
          </Link>
        )}
      </div>
    </div>
  );
}
