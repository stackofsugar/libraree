import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  layout('routes/layouts/main.tsx', [
    index('routes/home.tsx'),
    route('borrow', 'routes/borrow/index.tsx'),
    route('borrow/new', 'routes/borrow/new.tsx'),
    route('book', 'routes/book/new.tsx'),
    route('user', 'routes/user/new.tsx'),
    route('track', 'routes/borrow/track.tsx'),
  ]),
  route('login', 'routes/auth/login.tsx'),
] satisfies RouteConfig;
