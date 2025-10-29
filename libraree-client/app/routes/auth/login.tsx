import type { Route } from './+types/login';
import { Form, useNavigation, redirect } from 'react-router';

import axios from 'axios';
import Select from 'react-select';

import title from '~/lib/title';
import libraree from '~/assets/libraree.svg';
import simulatedLogins from './simulatedLogins';

export function meta({}: Route.MetaArgs) {
  return title('Login');
}

export async function clientAction({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const account = String(formData.get('account'));
  const errors: { account?: string; code?: string } = {};

  if (!account) {
    errors.account = "Account can't be empty";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return await axios
    .post(import.meta.env.VITE_API_ROOT + 'login', {
      user: {
        email_address: account,
        password: 'password',
      },
    })
    .then(function (response) {
      localStorage.setItem('user', response.data.user.token);
      return redirect('/');
    })
    .catch(function (error) {
      console.log(error);
      errors.code = error.code;
      return errors;
    });
}

export default function Login({ actionData }: Route.ComponentProps) {
  const errors = actionData || {};
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === '/login';

  return (
    <div className="flex flex-row h-dvh mx-2">
      <div className="m-auto h-fit basis-6/6 md:basis-4/6 lg:basis-3/6 xl:basis-2/6">
        <div className="card bg-base-200 card-md shadow-sm">
          <div className="card-body">
            {/* Card Start */}
            <div className="text-3xl font-bold card-title mb-4 justify-center">
              <div className="mx-1 h-[70px]">
                <img src={libraree} className="h-[70px] mb-1" alt="Libraree Logo" />
              </div>
              <div className="mx-1 divider divider-horizontal"></div>
              <div className="flex flex-col">
                <div className="flex">Demo Login</div>
                <div className="font-normal text-base flex flex-col flex-wrap">
                  <div>Libraree</div>
                </div>
              </div>
            </div>
            {/* Login Form */}
            <div className="mb-5">
              <Form method="post">
                <div className="grid grid-cols-1 gap-4 justify-items-center">
                  <div className="text-lg">Login As</div>
                  <div className="w-full">
                    <Select
                      name="account"
                      options={simulatedLogins}
                      className="w-full react-select-container mb-2"
                      classNamePrefix="react-select"
                    />
                    {errors?.code ? <div className="text-error">{errors.code}</div> : null}
                    {errors?.account ? <div className="text-error">{errors.account}</div> : null}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
            {/* Card Footer */}
            <div className="flex justify-center">
              <div className="opacity-60">Libraree: library made easy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
