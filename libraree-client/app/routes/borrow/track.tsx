import { Form, redirect, useNavigation, Link } from 'react-router';
import type { Route } from '../borrow/+types/track';
import { apiCall } from '~/lib/api';
import { tokenMiddleware } from '~/middleware/auth';

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [tokenMiddleware];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const result = await apiCall('get', 'borrows/all');
  console.log(result);
  return result;
}

export default function BorrowTrack({ loaderData, actionData }: Route.ComponentProps) {
  const result = loaderData;

  return (
    <div>
      <div className="text-center font-bold">Borrowed Books</div>
      <div className="px-5 mt-4">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Book Name</th>
                <th>Expected Return</th>
                <th>Returned At</th>
              </tr>
            </thead>
            <tbody>
              {result?.data.map((e: any) => (
                <tr>
                  <td>{e.user.name}</td>
                  <td>{e.book.title}</td>
                  <td>{e.return_date}</td>
                  <td>
                    {e.returned_at ? (
                      e.returned_at
                    ) : (
                      <div className="badge badge-warning">Not returned yet</div>
                    )}
                    {e.late ? (
                      <div className="mt-1">
                        <div className="badge badge-error">Returned late</div>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
