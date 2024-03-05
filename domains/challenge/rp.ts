export function rp(
  met: number,
  time: number,
  weightCoefficient: number | undefined,
  baseWeight: number | undefined,
): number {
  // Use the provided values or default to 1 if they are not provided
  const effectiveWeightCoefficient = weightCoefficient ?? 1;
  const effectiveBaseWeight = baseWeight ?? 1;

  // Apply the formula
  return Math.round(
    (met * 70 * time * effectiveWeightCoefficient * effectiveBaseWeight) / 10,
  );
}
