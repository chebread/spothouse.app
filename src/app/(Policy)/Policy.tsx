import { useSearchParams } from 'next/navigation';
import Privacy from './Privacy';
import Terms from './Terms';

const Policy = () => {
  const searchParams = useSearchParams();
  const paramPolicy = searchParams.get('policy');

  return (() => {
    switch (paramPolicy) {
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      default:
        return null;
    }
  })();
};

export default Policy;
