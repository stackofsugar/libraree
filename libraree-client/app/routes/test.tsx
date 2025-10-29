import type { Route } from './+types/home';
import title from '~/lib/title';

export function meta({}: Route.MetaArgs) {
  return title('Test');
}

export default function Test() {
  return (
    <>
      <div>Testing testing!</div>
    </>
  );
}
