import runningWhite from './assets/running-white.svg';
import pullupsWhite from './assets/pullups-white.svg';
import pushupsWhite from './assets/pushups-white.svg';
import swimmingWhite from './assets/swimming-white.svg';
import squatsWhite from './assets/squats-white.svg';
import plankWhite from './assets/plank-white.svg';
import bikeWhite from './assets/bike-white.svg';
import benchPressWhite from './assets/bench-press-white.svg';
import lungesWhite from './assets/lunges-white.svg';
import rowingWhite from './assets/rowing-white.svg';

export const ACTIVITY_TYPES = {
  running: {
    unit: 'km',
    icon: runningWhite,
    name: 'running',
  },
  pullups: {
    unit: 'reps',
    icon: pullupsWhite,
    name: 'pull-ups',
  },
  pushups: {
    unit: 'reps',
    icon: pushupsWhite,
    name: 'push-ups',
  },
  // squats: {
  //   unit: 'reps',
  //   icon: squatsWhite,
  // },
  swimming: {
    unit: 'pools',
    icon: swimmingWhite,
    name: 'swimming',
  },
  plank: {
    unit: 'min',
    icon: plankWhite,
    name: 'plank',
  },
  bike: {
    unit: 'km',
    icon: bikeWhite,
    name: 'bike',
  },
  benchPress: {
    unit: 'reps',
    icon: benchPressWhite,
    name: 'bench-press',
  },
  lungesWhite: {
    unit: 'reps',
    icon: lungesWhite,
    name: 'lunges',
  },
  rowing: {
    unit: 'km',
    icon: rowingWhite,
    name: 'rowing',
  },
};
