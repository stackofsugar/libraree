import { Form, redirect, useNavigation, Link } from 'react-router';
import type { Route } from '../book/+types/new';
import { apiCall } from '~/lib/api';
import { tokenMiddleware } from '~/middleware/auth';
import genericApiError from '~/lib/genericApiError';

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [tokenMiddleware];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const result = await apiCall('get', 'books?in_stock=true');
  console.log(result);
  return result;
}

export async function clientAction({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = String(formData.get('title'));
  const isbn = String(formData.get('isbn'));
  const stock = String(formData.get('stock'));
  const errors: any = {};

  if (!title) {
    errors.title = "Title can't be empty";
  }

  if (!isbn) {
    errors.isbn = "ISBN can't be empty";
  }

  if (!stock) {
    errors.stock = "Stock can't be empty";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const result = await apiCall('post', 'books', {
    book: {
      title: title,
      isbn: isbn,
      stock: stock,
    },
  });
  console.log(result);

  if (result.success == false) {
    errors.api = true;
    errors.error = result.error.response.data;
    return errors;
  } else {
    errors.success = true;
    return errors;
  }
}

export default function BookNew({ loaderData, actionData }: Route.ComponentProps) {
  const errors = actionData || {};
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === '/book/new';

  return (
    <div className="flex justify-center">
      <div className="basis-6/6 sm:basis-4/6 md:basis-3/6 px-5">
        {errors?.api && genericApiError(errors.error)}
        {errors?.success && (
          <div role="alert" className="alert alert-success mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Book has been succesfully added</span>
          </div>
        )}
        <Form method="post">
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Book Name</legend>
              <input type="text" name="title" className="input w-full" />
              {errors?.title ? <div className="text-error">{errors.title}</div> : null}
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">ISBN</legend>
              <input type="text" name="isbn" className="input w-full" />
              {errors?.isbn ? <div className="text-error">{errors.isbn}</div> : null}
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Initial Stock</legend>
              <input type="number" name="stock" className="input w-full" />
              {errors?.stock ? <div className="text-error">{errors.stock}</div> : null}
            </fieldset>
          </div>
          <div className="mt-7 flex gap-1">
            <button type="submit" className="btn btn-primary grow">
              Submit
            </button>
            <Link to="/" className="btn btn-warning">
              Back
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
