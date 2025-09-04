import { useMemo, useState } from 'react';
import Button from '../reusable/Button';
import CloseButton from '../reusable/CloseButton';
import InstructionsDescription from '../reusable/InstructionsDesciption';
import Sprite from '../reusable/Sprite';
import { createZombieOne } from '../../defaults';
import { createWizardAnimations } from '@/model/animations/wizardAnimations';
import { wizardSkills } from '@/model/entities/skills/wizardSkills';
import SkillButton from '../reusable/SkillButton';
import GoldDisplay from './GoldDisplay';
import WaveDisplay from './WaveDisplay';
import NextWaveButton from './NextWaveButton';

type InstructionsProps = {
  onClose?: () => void;
};
type Category = {
  title: 'characters' | 'attributes' | 'skills' | 'enemies' | 'gold' | 'wave';
  description: string;
};
const categs: Category[] = [
  {
    title: 'characters',
    description:
      'You can hire characters for gold. ' +
      'On the left side of the screen you can access Hire window by clicking one of the plus icons. ' +
      'Characters and hire cost is displayed bleow. ' +
      'In that screen you can also see Attributes and skills character has. ' +
      'You can hire up to 4 heros. Each hero has different set of stregths and weaknesses ' +
      'For example knighs are tough and have alot of health but they do not have ranged attaks. ' +
      'While wizards are powerful ranged attackers, but they are very fragile if enemies gets too close.',
  },
  {
    title: 'attributes',
    description:
      'Each attribute is resposible for different characteristics of your heroes. ' +
      'Every point of strength increase damage dealt by 1%. ' +
      'Dexterity increase heroes actions speed. ' +
      'You can see how long each skill takes to cast on the character skill screen indicators. ' +
      'Every point of intelligence increase Energy by 10 points and also makes you regenerate it faster. ' +
      'Vitality increase Health points by 10 and make you regenerate Health faster. ',
  },
  {
    title: 'skills',
    description:
      'Heroes have 4 skills. First skill usually have a passive effect, while other three are active skills. ' +
      'Active skills cost Energy. Once you run out of Energy hero activates his/hers passive skill. ' +
      'Skill cast speed, damage, and cost are displayed at the bottom of the skill screen. ' +
      'Tip: you can enable autocast in settings. Autocast allows heroes to activate their last cast skill once they have enough Energy. ',
  },
  {
    title: 'enemies',
    description:
      'Enemies are various monster you encounter each wave. Once their health is reduced to zero they die. ' +
      'Same as heroes monsters have different cahracteristics, make sure to check them by hovering on monsters. ' +
      'Monster information will be displayed at the bottom right of the screen.',
  },
  {
    title: 'gold',
    description:
      'Every monster will grant some gold on death. You can spend gold on hero skill upgrades or to hire new heroes to your party. ' +
      'Accumulated gold also counts towards your final score.',
  },
  {
    title: 'wave',
    description:
      'Levels consist of waves. You can see total and current wave on the top right corner of the screen. ' +
      'Once you deafeat all enemies for that wave "Next wave" button appears. ' +
      'On a new wave start your heroes regenerate their Energy and Health to full. ' +
      'Tip: You can time this for your advantage!',
  },
];
export default function Instructions({ onClose }: InstructionsProps) {
  const enemy = useMemo(() => createZombieOne(), []);
  const charAnim = useMemo(() => createWizardAnimations(), []);
  const [categories] = useState<Category[]>(categs);
  const [selected, setSelecetd] = useState<number>(0);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative flex h-[600px] min-h-[512px] w-[640px] flex-col gap-2 overflow-auto border-4 border-medieval-silver bg-medieval-stone p-6 text-medieval-parchment shadow-xl">
        <h1 className="text-2xl font-bold">Guidebook</h1>
        <CloseButton onClose={() => onClose?.()} />
        <div className="flex flex-grow flex-row gap-2">
          <div className="flex w-[128px] flex-col justify-start gap-2">
            {categories.map((cat, index) => (
              <Button
                key={cat.title}
                className={`${selected === index && 'bg-medieval-stoneCrimson'}`}
                onClick={() => setSelecetd(index)}
              >
                {cat.title.slice(0, 1).toLocaleUpperCase() + cat.title.slice(1)}
              </Button>
            ))}
          </div>
          <InstructionsDescription>
            {categories[selected].title === 'enemies' && (
              <div className="mb-2 flex flex-row justify-around bg-medieval-silver/80">
                <Sprite animation={enemy.animations.idle} entity="enemy" />
                <Sprite animation={enemy.animations.attack} entity="enemy" />
                <Sprite animation={enemy.animations.move} entity="enemy" />
              </div>
            )}
            {categories[selected].title === 'characters' && (
              <div className="mb-2 flex flex-row justify-around bg-medieval-silver/80">
                <Sprite animation={charAnim.idle} entity="enemy" />
                <Sprite animation={charAnim.magicBall} entity="enemy" />
                <Sprite animation={charAnim.dead} entity="enemy" />
              </div>
            )}
            {categories[selected].title === 'attributes' && (
              <div className="text-cente mb-2 flex flex-col items-center gap-2 bg-medieval-silver/20 py-2">
                {['Strength', 'Dexterity', 'Intelligence', 'Vitality'].map(
                  (att) => (
                    <div
                      key={att}
                      className={`flex w-[256px] flex-row items-center justify-between gap-2 border-2 border-medieval-parchment bg-medieval-wood py-1 pr-4 text-medieval-silver transition-all duration-200`}
                    >
                      <span className="pl-2">
                        {att === 'Strength'
                          ? '💪'
                          : att === 'Dexterity'
                            ? '🏹'
                            : att === 'Intelligence'
                              ? '🧠'
                              : '❤️'}
                      </span>{' '}
                      <span className="self-center justify-self-center pr-2 text-center font-bold">
                        {att}
                      </span>{' '}
                      <span className="font-bold">10</span>
                    </div>
                  ),
                )}
              </div>
            )}
            {categories[selected].title === 'skills' && (
              <div className="mb-2 flex flex-row justify-around gap-2 bg-medieval-silver/20 py-2">
                {wizardSkills.map((skill) => (
                  <SkillButton
                    key={skill.id}
                    url={skill.url}
                    skillName={skill.name}
                    disabled={true}
                    size="lg"
                  />
                ))}
              </div>
            )}
            {categories[selected].title === 'gold' && (
              <div className="relative mb-2 h-20 bg-medieval-silver/20">
                <GoldDisplay demo={true} />
              </div>
            )}
            {categories[selected].title === 'wave' && (
              <div className="relative mb-2 h-24 bg-medieval-silver/20 p-2">
                <WaveDisplay />
                <NextWaveButton demo={true} />
              </div>
            )}
            <div className="bg-medieval-dark/20 p-2">
              {categories[selected].description}
            </div>
          </InstructionsDescription>
        </div>
      </div>
    </div>
  );
}
