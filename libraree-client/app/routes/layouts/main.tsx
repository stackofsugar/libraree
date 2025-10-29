import libraree from '~/assets/libraree.svg';
import { Outlet, Link, useNavigation, useLocation } from 'react-router';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const loc = useLocation();

  console.log();

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <img src={libraree} alt="Libraree logo" className="w-20" />
            <div className="text-4xl flex items-center">Libraree</div>
          </div>
          <div className="opacity-60 text-center">Library made simple!</div>
          {loc.pathname !== '/' && (
            <Link to="/" className="text-center btn btn-neutral btn-ghost">
              Back to Home
            </Link>
          )}
        </div>
      </div>
      <div className="mt-7">
        <Outlet />
      </div>
    </div>
  );
}
