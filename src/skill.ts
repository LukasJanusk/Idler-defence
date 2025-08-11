import { v4 } from 'uuid';
import fire from './assets/Fire_Wizard/Charge.png';
import { createProjectileAnimation, Projectile } from './projectile';

export class Skill {
  id: string;
  name: string;
  animation: Animation;
  triggerFrame: number;
  onTrigger?: (dt: number) => void;
  elapsed: number = 0;

  constructor(
    id: string,
    name: string,
    animation: Animation,
    cb: (dt: number) => void,
  ) {
    this.id = id || v4();
    this.name = name;
    this.animation = animation;
    this.cb = cb;
  }
}

const fireBallUrl = new URL(fire, import.meta.url).href;
const fireBallAnimation = await createProjectileAnimation(
  fireBallUrl,
  12,
  5,
  100,
  'Fire Ball',
);
const testProj = new Projectile('testProj', 'Ball', fireBallAnimation);
