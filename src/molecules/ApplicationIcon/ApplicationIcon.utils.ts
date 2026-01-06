import { ShapeProps } from 'src/molecules/ApplicationIcon/ApplicationIconBase/ApplicationIconBase';

export function nameToAcronym(name: string): string {
  const split = name.toUpperCase().split(' ');

  if (split.length === 1) return name.toUpperCase()[0];

  return `${split[0][0]}${split[1][0]}`;
}

export function nameToShapes(name: string) {
  const availableShapes: ShapeProps[][] = [
    [
      {
        top: -16,
        left: -17,
        rotation: 325,
      },
      {
        top: 26,
        left: 11,
        rotation: 193,
      },
    ],
    [
      {
        top: -31,
        left: -17,
        rotation: 343,
      },
      {
        top: 42,
        left: 32,
        rotation: 182,
      },
    ],
    [
      {
        top: -45,
        left: -5,
        rotation: 25,
      },
      {
        top: 64,
        left: -5,
        rotation: 5,
      },
    ],
    [
      {
        top: -16,
        left: -31,
        rotation: 339,
      },
      {
        top: 52,
        left: -5,
        rotation: 220,
      },
    ],
    [
      {
        top: -16,
        left: -17,
        rotation: 328,
      },
      {
        top: 26,
        left: 11,
        rotation: 193,
      },
    ],
    [
      {
        top: -25,
        left: -20,
        rotation: -5,
      },
      {
        top: 12,
        left: 45,
        rotation: -70,
      },
    ],
  ];

  const index =
    name
      .split('')
      .map((c) => c.charCodeAt(0))
      .reduce((a, b) => a + b, 0) % availableShapes.length;

  return availableShapes[index];
}
