import SplashScreen from '@/components/reusable/SplashScreen';
import { useState } from 'react';

function HomePage() {
  const [splashVisible, setSplashVisible] = useState(true);

  return (
    <SplashScreen
      splashVisible={splashVisible}
      setSplashVisible={(state: boolean) => setSplashVisible(state)}
    />
  );
}

export default HomePage;
