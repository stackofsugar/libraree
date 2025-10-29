import { Form, redirect, useNavigation, Link } from 'react-router';
import type { Route } from '../user/+types/new';
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
  const name = String(formData.get('name'));
  const email_address = String(formData.get('email_address'));
  const id_card_number = String(formData.get('id_card_number'));
  const errors: any = {};

  if (!name) {
    errors.name = "Name can't be empty";
  }
  if (!email_address) {
    errors.email_address = "Email Address can't be empty";
  }
  if (!id_card_number) {
    errors.id_card_number = "ID Card Number can't be empty";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const result = await apiCall('post', 'borrowers', {
    user: {
      name: name,
      email_address: email_address,
      id_card_number: id_card_number,
      password: 'password',
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

export default function UserNew({ loaderData, actionData }: Route.ComponentProps) {
  const errors = actionData || {};
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === '/user';

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
            <span>User has been succesfully added</span>
          </div>
        )}
        <Form method="post">
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input type="text" name="name" className="input w-full" />
              {errors?.name ? <div className="text-error">{errors.name}</div> : null}
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Address</legend>
              <input type="text" name="email_address" className="input w-full" />
              {errors?.email_address ? (
                <div className="text-error">{errors.email_address}</div>
              ) : null}
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">ID Card Number</legend>
              <input type="number" name="id_card_number" className="input w-full" />
              {errors?.id_card_number ? (
                <div className="text-error">{errors.id_card_number}</div>
              ) : null}
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
