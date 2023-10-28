import Notifications from 'app/(Notifications)';
import Policy from 'app/(Policy)';
import Profile from 'app/(Profile)';
import Settigns from 'components/Settigns';
import { useSearchParams } from 'next/navigation';

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
        return <Settigns />;
      case 'n':
        return <Notifications />;
      case 'p':
        return paramPosts != '' ? '' : '';
      case 'policy':
        return <Policy />;
      default:
        return null;
    }
  })();
};

export default Router;
