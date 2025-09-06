import Button from '@/components/reusable/Button';
import { useParticleContext } from '@/context/ParticleContext';

export default function Particles() {
  const {
    splashBlood,
    splashEmbers,
    splashArcane,
    splashHealth,
    splashMagic,
    splashSparks,
    splashLines,
  } = useParticleContext();
  return (
    <div className="absolute left-0 top-0 z-50 bg-white">
      <Button onClick={() => splashBlood(500, 300, 120)}>Splash Blood</Button>
      <Button onClick={() => splashEmbers(500, 300, 120)}>Splash Embers</Button>
      <Button onClick={() => splashArcane(500, 300, 120)}>Splash Arcane</Button>
      <Button onClick={() => splashHealth(500, 300, 120)}>Splash Health</Button>
      <Button onClick={() => splashMagic(500, 300, 120)}>Splash Magic</Button>
      <Button onClick={() => splashSparks(500, 300, 120)}>Splash Sparks</Button>
      <Button onClick={() => splashLines(500, 300, 1)}>Splash lines</Button>
    </div>
  );
}
