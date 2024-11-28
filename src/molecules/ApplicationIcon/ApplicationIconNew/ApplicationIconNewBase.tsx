import { FC } from 'react';

import { AppBaseProps } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew.utils';
import {
  AppIconContainer,
  IconContainer,
  Wave,
  WaveInnerContainer,
  Waves,
} from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewBase.styles';
import { AppIconSvg } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewData/AppIconSvg';
import { NoiseShape } from 'src/molecules/ApplicationIcon/ApplicationIconNew/NoiseShape';
import { WaveShape } from 'src/molecules/ApplicationIcon/ApplicationIconNew/WaveShape';

export const ApplicationIconNewBase: FC<AppBaseProps> = ({
  waveIntervalDist = 14.75,
  size = 512,
  color = 'blue',
  rotationVariant = 1,
  hasLargeWaves = false,
  animationState = 'none',
  appIconData,
  iconOnly,
}) => {
  const waves = Array.from({ length: 8 }, (_, index) => {
    const top = hasLargeWaves
      ? index * (waveIntervalDist * 1.15)
      : index * waveIntervalDist;
    const altWave = index % 2 === 0;
    const delay =
      animationState === 'animated' ? index * 750 : (index + 1) * 50;

    if (size <= 128) {
      hasLargeWaves = true;
    }
    return {
      waveIntervalDist: top,
      size,
      delay,
      altWave,
      hasLargeWaves,
      animationState,
      appIconData,
    };
  });

  return (
    <AppIconContainer
      $size={size}
      $color={color}
      $animationState={animationState}
      $iconOnly={iconOnly}
      data-testid="app-icon-container"
    >
      <IconContainer data-testid="icon-container">
        <AppIconSvg paths={appIconData} />
      </IconContainer>
      {!iconOnly && (
        <Waves $animationState={animationState} data-testid="waves-container">
          <WaveInnerContainer $color={color} $rotationVariant={rotationVariant}>
            <Wave
              className="wave"
              $waveIntervalDist={0}
              data-testid="wave"
              style={{
                animationDelay: `0ms`,
                transitionDelay: `0ms`,
              }}
            >
              <WaveShape isAltWave={false} hasLargeWaves={hasLargeWaves} />
              <NoiseShape
                index={-1}
                isAltWave={false}
                hasLargeWaves={hasLargeWaves}
              />
            </Wave>
            {waves.map((wave, index) => (
              <Wave
                className="wave"
                key={index}
                $waveIntervalDist={wave.waveIntervalDist}
                data-testid="wave"
                style={{
                  animationDelay: `${wave.delay}ms`,
                  transitionDelay: `${wave.delay}ms`,
                }}
              >
                <WaveShape
                  isAltWave={wave.altWave}
                  hasLargeWaves={wave.hasLargeWaves}
                />
                <NoiseShape
                  index={index}
                  isAltWave={wave.altWave}
                  hasLargeWaves={wave.hasLargeWaves}
                />
              </Wave>
            ))}
          </WaveInnerContainer>
        </Waves>
      )}
    </AppIconContainer>
  );
};

ApplicationIconNewBase.displayName = 'ApplicationIconNewBase';
