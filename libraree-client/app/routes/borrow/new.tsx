import { Form, redirect, useNavigation, Link } from 'react-router';
import type { Route } from '../borrow/+types/new';
import { apiCall } from '~/lib/api';
import { tokenMiddleware } from '~/middleware/auth';

import Select from 'react-select';
import genericApiError from '~/lib/genericApiError';

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [tokenMiddleware];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const result = await apiCall('get', 'books?in_stock=true');
  console.log(result);
  return result;
}

export async function clientAction({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const book = String(formData.get('book'));
  const date = String(formData.get('date'));
  const errors: any = {};

  if (!book) {
    errors.book = "Book can't be empty";
  }

  if (!date) {
    errors.date = "Date can't be empty";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const result = await apiCall('post', 'borrows', {
    borrowing: {
      return_date: date,
      book_id: book,
    },
  });
  console.log(result);

  if (result.success == false) {
    errors.api = true;
    errors.error = result.error.response.data;
    return errors;
  } else {
    throw redirect('/borrow');
  }
}

export default function BorrowIndex({ loaderData, actionData }: Route.ComponentProps) {
  const result = loaderData;
  const errors = actionData || {};
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === '/borrow/new';

  return (
    <div className="flex justify-center">
      <div className="basis-6/6 sm:basis-4/6 md:basis-3/6 px-5">
        {errors?.api && genericApiError(errors.error)}
        <Form method="post">
          <div>
            <Select
              name="book"
              options={
                result.success
                  ? result.data.map((elem: any) => ({
                      value: elem.id,
                      label: elem.title,
                    }))
                  : []
              }
              placeholder="Select a Book"
              className="w-full react-select-container mb-2"
              classNamePrefix="react-select"
            />
            {errors?.date ? <div className="text-error text-sm">{errors.date}</div> : null}
          </div>
          <div className="mt-3">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Return Date</legend>
              <input type="date" name="date" className="input w-full" />
              {errors?.book ? <div className="text-error">{errors.book}</div> : null}
            </fieldset>
          </div>
          <div className="mt-7 flex gap-1">
            <button type="submit" className="btn btn-primary grow">
              Submit
            </button>
            <Link to="/borrow" className="btn btn-warning">
              Back
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
