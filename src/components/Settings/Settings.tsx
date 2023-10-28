import License from 'app/(Policy)/License';
import Privacy from 'app/(Policy)/Privacy';
import Terms from 'app/(Policy)/Terms';
import Preferences from 'app/(Preferences)';
import BottomSheet from 'components/BottomSheet';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Settings = () => {
  const searchParams = useSearchParams();
  const paramSettings = searchParams.get('s');
  const router = useRouter();

  const onDismiss = (e: any) => {
    router.push('/');
  };

  return (
    <BottomSheet open={true} onDismiss={onDismiss}>
      {(() => {
        switch (paramSettings) {
          case '':
            return <Preferences />;
          case 't':
            return <Terms />;
          case 'p':
            return <Privacy />;
          case 'l':
            return <License />;
          default:
            return null;
        }
      })()}
    </BottomSheet>
  );
};

export default Settings;
