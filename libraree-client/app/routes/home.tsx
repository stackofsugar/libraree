import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Libraree' }, { name: 'description', content: 'Welcome to Libraree!' }];
}

export default function Home() {
  return <Welcome />;
}
