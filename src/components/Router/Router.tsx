import Notifications from 'app/(Notifications)';
import Profile from 'app/(Profile)';
import { useSearchParams } from 'next/navigation';
import Settings from 'app/(Settings)';
import About from 'app/(About)';

const Router = () => {
  const searchParams = useSearchParams();
  const paramRoutes = searchParams
    .toString()
    .substring(0, searchParams.toString().indexOf('='));
  const paramUsername = searchParams.get('u');
  const paramPosts = searchParams.get('p');

  return (() => {
    // Router 컴포넌트로 전환함
    switch (paramRoutes) {
      case 'u':
        return paramUsername != '' ? <Profile /> : '';

      case 's':
        return <Settings />;
      case 'a':
        return <About />;
      case 'n':
        return <Notifications />;
      case 'p':
        return paramPosts != '' ? '' : '';
      default:
        return null;
    }
  })();
};

export default Router;
