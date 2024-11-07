import { FC } from 'react';

import {
  SHAPE_TRANSITIONS,
  SHAPES,
} from 'src/organisms/Status/Illustration.constants';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  width: 328px;
  height: 232px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    flex-shrink: 0;
    > path:nth-last-child(4) {
      filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.25));
    }
    > path {
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
    }
  }
`;

interface IllustrationProps {
  color: string;
}

export const Illustration: FC<IllustrationProps> = ({ color }) => (
  <Container>
    <svg
      width="1015"
      height="713"
      viewBox="0 0 1015 713"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1015" height="713" fill="#333333" />
      {SHAPES.map((shape, index) => (
        <motion.path
          key={index}
          fillRule="evenodd"
          clipRule="evenodd"
          fill={shape.fill}
          initial={{ d: shape.d1 }}
          animate={{ d: [shape.d1, shape.d2, shape.d1] }}
          transition={SHAPE_TRANSITIONS[index]}
          stroke="#ABABAB"
          strokeWidth="0.5"
        />
      ))}
      <rect
        width="1015"
        height="713"
        fill={color}
        mask="url(#color-mask)"
        style={{ mixBlendMode: 'multiply' }}
      />
      <rect
        width="1015"
        height="713"
        filter="url(#nnnoise-filter)"
        mask="url(#noise-mask)"
      />
      <defs>
        <mask id="color-mask">
          <rect width="1015" height="713" fill="white" />
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            initial={{ d: SHAPES.at(-2)!.d1 }}
            animate={{
              d: [SHAPES.at(-2)!.d1, SHAPES.at(-2)!.d2, SHAPES.at(-2)!.d1],
            }}
            transition={SHAPE_TRANSITIONS.at(-2)!}
            fill="black"
          />
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            initial={{ d: SHAPES.at(-1)!.d1 }}
            animate={{
              d: [SHAPES.at(-1)!.d1, SHAPES.at(-1)!.d2, SHAPES.at(-1)!.d1],
            }}
            transition={SHAPE_TRANSITIONS.at(-1)!}
            fill="black"
          />
        </mask>
        <mask id="noise-mask">
          <rect width="1015" height="713" fill="white" />
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            initial={{ d: SHAPES.at(-1)!.d1 }}
            animate={{
              d: [SHAPES.at(-1)!.d1, SHAPES.at(-1)!.d2, SHAPES.at(-1)!.d1],
            }}
            transition={SHAPE_TRANSITIONS.at(-1)!}
            fill="black"
          />
        </mask>
        <filter
          id="nnnoise-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="linearRGB"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.2"
            numOctaves="4"
            seed="15"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          />
          <motion.feSpecularLighting
            surfaceScale="60"
            specularConstant="2.3"
            specularExponent="20"
            lightingColor="#441c7b"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            result="specularLighting"
            animate={{ specularExponent: [20, 40, 20] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <feDistantLight azimuth="3" elevation="54" />
          </motion.feSpecularLighting>
          <feColorMatrix
            type="saturate"
            values="0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="specularLighting"
            result="colormatrix"
          />
        </filter>
      </defs>
    </svg>
  </Container>
);
