export type calcFields = {
  met: number;
  time: number;
  intenseLevel: number;

  weight: number;
  height: number;
  age: number;
  activityLevel: number;
};

export function rp(fields: calcFields): number {
  const { met, time, intenseLevel, weight, height, age, activityLevel } =
    fields;
  const bmr = (10 * weight + 6.25 * height - 5 * age + 5) * activityLevel;
  const cal = (bmr / 24) * time * met * intenseLevel;
  return Math.ceil(cal / 10);
}
