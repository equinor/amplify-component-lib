import { createRef, useState } from 'react';

import { DotProgress } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Banner, BannerProps } from './Banner';
import { BANNER_COLORS } from './Banner.tokens';
import { Button } from 'src/molecules/Button/Button';
import { getLoadingColor } from 'src/molecules/Button/Button.utils';
import { IconButton } from 'src/molecules/Button/IconButton/IconButton';
import { StyledCircularProgress } from 'src/molecules/Button/IconButton/IconButton.styles';

import { expect, fn, userEvent, within } from 'storybook/test';
import styled from 'styled-components';

const meta = {
  title: 'Molecules/Banner/Contracts',
  component: Banner,
  tags: ['test-only', '!dev', '!autodocs'],
  args: { variant: 'info', children: 'Message' },
  parameters: { router: { initial: '/', routes: ['$'] } },
} satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;

const variants = ['ghost', 'outlined', 'filled'] as const;
const buttonStyle = (element: HTMLElement) => {
  const { backgroundColor, color, borderColor } = getComputedStyle(element);
  return { backgroundColor, color, borderColor };
};

export const LoadingColors: Story = {
  play: async ({ mount, step }) => {
    for (const theme of ['light', 'dark']) {
      for (const variant of variants) {
        await step(`${theme} ${variant} loading indicators`, async () => {
          const buttons = (
            <>
              {([undefined, 'primary', 'danger'] as const).map((color) => (
                <span key={color ?? 'inherited'}>
                  <Button
                    variant={variant}
                    color={color}
                    loading
                    aria-label={`${color ?? 'inherited'} dots`}
                  />
                  <IconButton
                    variant={variant}
                    color={color}
                    icon={close}
                    loading
                    aria-label={`${color ?? 'inherited'} circle`}
                  />
                </span>
              ))}
            </>
          );
          const canvas = await mount(
            <div data-theme={theme}>
              <div role="group" aria-label="outside">
                {buttons}
              </div>
              {(['info', 'warning', 'danger'] as const).map((bannerVariant) => (
                <Banner
                  key={bannerVariant}
                  variant={bannerVariant}
                  role="group"
                  aria-label={bannerVariant}
                  actions={buttons}
                >
                  <Button
                    variant={variant}
                    aria-label="Expected color"
                    style={{
                      outlineColor:
                        'color-mix(in srgb, currentColor 20%, transparent)',
                    }}
                  >
                    Reference
                  </Button>
                </Banner>
              ))}
              {(['primary', 'danger'] as const).map((color) => {
                const loadingColor = getLoadingColor({ color, variant });
                return (
                  <span key={color}>
                    <DotProgress
                      color={loadingColor}
                      aria-label={`${color} reference dots`}
                    />
                    <StyledCircularProgress
                      $isTertiary={loadingColor === 'tertiary'}
                      color={loadingColor === 'neutral' ? 'neutral' : 'primary'}
                      aria-label={`${color} reference circle`}
                    />
                  </span>
                );
              })}
            </div>
          );
          for (const group of canvas.getAllByRole('group')) {
            const scope = within(group);
            for (const color of ['inherited', 'primary', 'danger']) {
              const dots = within(
                scope.getByRole('button', { name: `${color} dots` })
              ).getByRole('progressbar');
              const circle = within(
                scope.getByRole('button', { name: `${color} circle` })
              ).getByRole('progressbar');
              if (
                color === 'inherited' &&
                group.getAttribute('aria-label') !== 'outside'
              ) {
                const expected = getComputedStyle(
                  scope.getByRole('button', { name: 'Expected color' })
                );
                await expect(getComputedStyle(dots).fill).toBe(expected.color);
                await expect(
                  getComputedStyle(circle.querySelector('circle:last-child')!)
                    .stroke
                ).toBe(expected.color);
                await expect(
                  getComputedStyle(circle.querySelector('circle:first-child')!)
                    .stroke
                ).toBe(expected.outlineColor);
              } else {
                const reference = color === 'inherited' ? 'primary' : color;
                const referenceDots = canvas.getByRole('progressbar', {
                  name: `${reference} reference dots`,
                });
                const referenceCircle = canvas.getByRole('progressbar', {
                  name: `${reference} reference circle`,
                });
                await expect(getComputedStyle(dots).fill).toBe(
                  getComputedStyle(referenceDots).fill
                );
                for (const selector of [
                  'circle:first-child',
                  'circle:last-child',
                ]) {
                  await expect(
                    getComputedStyle(circle.querySelector(selector)!).stroke
                  ).toBe(
                    getComputedStyle(referenceCircle.querySelector(selector)!)
                      .stroke
                  );
                }
              }
            }
          }
        });
      }
    }
  },
};

export const ActionConfigs: Story = {
  play: async ({ mount, step }) => {
    await step(
      'Zero to four actions keep the recommended hierarchy',
      async () => {
        for (const expected of [
          [],
          ['filled'],
          ['outlined', 'filled'],
          ['ghost', 'outlined', 'filled'],
          ['ghost', 'ghost', 'outlined', 'filled'],
        ] as const) {
          const canvas = await mount(
            <Banner
              variant="info"
              actions={expected.map((_, index) => ({
                label: `Action ${index}`,
                variant: undefined,
              }))}
            >
              {variants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </Banner>
          );
          await expect(canvas.getAllByRole('button')).toHaveLength(
            3 + expected.length
          );
          for (const [index, variant] of expected.entries()) {
            await expect(
              buttonStyle(
                canvas.getByRole('button', { name: `Action ${index}` })
              )
            ).toEqual(
              buttonStyle(canvas.getByRole('button', { name: variant }))
            );
          }
        }
      }
    );
    await step(
      'Config overrides, refs, links, disabled and loading',
      async () => {
        const ref = createRef<HTMLButtonElement>();
        const bannerRef = createRef<HTMLDivElement>();
        const onClick = fn();
        const canvas = await mount(
          <Banner
            ref={bannerRef}
            role="group"
            aria-label="Banner"
            variant="info"
            actions={[
              {
                label: 'Override',
                variant: 'filled',
                color: 'danger',
                ref,
                onClick,
              },
              { label: 'Native link', as: 'a', href: '/details' },
              { label: 'Router link', linkOptions: { to: '/details' } },
              { label: 'Disabled', disabled: true, onClick },
              {
                label: 'Loading',
                'aria-label': 'Loading',
                loading: true,
                onClick,
              },
            ]}
          >
            <Button color="danger">Reference</Button>
          </Banner>
        );
        const override = canvas.getByRole('button', { name: 'Override' });
        await expect(ref.current).toBe(override);
        await expect(bannerRef.current).toBe(canvas.getByRole('group'));
        await expect(override).toHaveAttribute('type', 'button');
        await expect(buttonStyle(override)).toEqual(
          buttonStyle(canvas.getByRole('button', { name: 'Reference' }))
        );
        for (const name of ['Native link', 'Router link']) {
          await expect(canvas.getByRole('link', { name })).toHaveAttribute(
            'href',
            '/details'
          );
        }
        await userEvent.click(canvas.getByRole('button', { name: 'Disabled' }));
        await userEvent.click(canvas.getByRole('button', { name: 'Loading' }));
        await expect(onClick).not.toHaveBeenCalled();
        await userEvent.click(override);
        await expect(onClick).toHaveBeenCalledOnce();
        await mount(<></>);
        await expect(ref.current).toBeNull();
        await expect(bannerRef.current).toBeNull();
      }
    );
    await step('JSX arrays preserve their explicit variants', async () => {
      const canvas = await mount(
        <Banner
          variant="info"
          actions={[
            <Button key="a">First</Button>,
            <Button key="b" variant="outlined">
              Last
            </Button>,
          ]}
        >
          Message
        </Banner>
      );
      await expect(
        getComputedStyle(canvas.getByRole('button', { name: 'First' }))
          .backgroundColor
      ).not.toBe('rgba(0, 0, 0, 0)');
      await expect(
        getComputedStyle(canvas.getByRole('button', { name: 'Last' }))
          .backgroundColor
      ).toBe('rgba(0, 0, 0, 0)');
    });
  },
};

const CustomButton = styled(Button)`
  background: ${BANNER_COLORS.info.text};
`;

function NestedActions() {
  return (
    <div>
      <Button>Nested action</Button>
      <IconButton icon={close} variant="ghost" aria-label="Nested icon" />
    </div>
  );
}

function InheritanceExample({ theme }: { theme: string }) {
  const [variant, setVariant] = useState<BannerProps['variant']>('danger');
  return (
    <div data-theme={theme}>
      <Button onClick={() => setVariant('warning')}>Change variant</Button>
      <Button>Outside</Button>
      {(['primary', 'danger'] as const).map((color) => (
        <span key={color}>
          <Button color={color}>{color} reference</Button>
          <IconButton
            icon={close}
            variant="ghost"
            color={color}
            aria-label={`${color} icon reference`}
          />
        </span>
      ))}
      <Banner variant={variant} actions={<NestedActions />}>
        <Button>Content action</Button>
        <CustomButton>Styled override</CustomButton>
        {(['primary', 'danger'] as const).map((color) => (
          <span key={color}>
            <Button color={color}>{color} override</Button>
            <IconButton
              icon={close}
              variant="ghost"
              color={color}
              aria-label={`${color} icon override`}
            />
          </span>
        ))}
        <Banner variant="info" actions={<Button>Inner action</Button>}>
          Nested banner
        </Banner>
      </Banner>
    </div>
  );
}

export const Inheritance: Story = {
  play: async ({ mount, step }) => {
    for (const theme of ['light', 'dark']) {
      await step(
        `${theme}: DOM inheritance, nearest banner and explicit overrides`,
        async () => {
          const canvas = await mount(
            <InheritanceExample key={theme} theme={theme} />
          );
          const style = (name: string) =>
            buttonStyle(canvas.getByRole('button', { name }));
          const [danger, warning, info] =
            theme === 'dark'
              ? [
                  'rgb(255, 171, 176)',
                  'rgb(255, 198, 122)',
                  'rgb(183, 232, 255)',
                ]
              : ['rgb(179, 13, 47)', 'rgb(173, 98, 0)', 'rgb(0, 112, 169)'];
          for (const color of [danger, warning]) {
            await expect(style('Nested action').backgroundColor).toBe(color);
            await expect(style('Content action').backgroundColor).toBe(color);
            await expect(style('Nested icon').color).toBe(color);
            await expect(style('Inner action').backgroundColor).toBe(info);
            await expect(style('Styled override').backgroundColor).toBe(info);
            await expect(style('Outside')).toEqual(style('primary reference'));
            for (const override of ['primary', 'danger']) {
              await expect(style(`${override} override`)).toEqual(
                style(`${override} reference`)
              );
              await expect(style(`${override} icon override`)).toEqual(
                style(`${override} icon reference`)
              );
            }
            if (color === danger)
              await userEvent.click(
                canvas.getByRole('button', { name: 'Change variant' })
              );
          }
        }
      );
    }
  },
};

export const ButtonStates: Story = {
  play: async ({ mount, step }) => {
    // Native pointer events are needed to activate CSS :hover and :active.
    const { userEvent: pointer } = await import('@vitest/browser/context');
    for (const theme of ['light', 'dark']) {
      await step(`${theme}: primary fallbacks outside banners`, async () => {
        const onPress = fn();
        const canvas = await mount(
          <div data-theme={theme}>
            {variants.map((variant) => (
              <div key={variant}>
                <Button
                  variant={variant}
                  onMouseDown={(event) =>
                    onPress(buttonStyle(event.currentTarget))
                  }
                >
                  {variant} default
                </Button>
                <Button
                  variant={variant}
                  color="primary"
                  onMouseDown={(event) =>
                    onPress(buttonStyle(event.currentTarget))
                  }
                >
                  {variant} primary
                </Button>
              </div>
            ))}
          </div>
        );
        for (const variant of variants) {
          const implicit = canvas.getByRole('button', {
            name: `${variant} default`,
          });
          const explicit = canvas.getByRole('button', {
            name: `${variant} primary`,
          });
          await pointer.unhover(implicit);
          await expect(buttonStyle(implicit)).toEqual(buttonStyle(explicit));
          await pointer.hover(implicit);
          const hover = buttonStyle(implicit);
          await pointer.hover(explicit);
          await expect(buttonStyle(explicit)).toEqual(hover);
          onPress.mockClear();
          await pointer.click(implicit);
          await pointer.click(explicit);
          await expect(onPress).toHaveBeenCalledTimes(2);
          await expect(onPress.mock.calls[0]).toEqual(onPress.mock.calls[1]);
        }
      });
      for (const variant of ['info', 'warning', 'danger'] as const) {
        await step(
          `${theme} ${variant}: hover, pressed and disabled`,
          async () => {
            const palette = BANNER_COLORS[variant];
            const onPress = fn();
            const canvas = await mount(
              <div data-theme={theme}>
                <span
                  title="Expected palette"
                  style={{
                    color: palette.text,
                    backgroundColor: palette.hover,
                    borderColor: palette.nestedHover,
                  }}
                />
                <Banner
                  variant={variant}
                  actions={variants.map((buttonVariant) => ({
                    label: buttonVariant,
                    onMouseDown: (event) =>
                      onPress(
                        event.currentTarget.matches(':active'),
                        buttonStyle(event.currentTarget)
                      ),
                  }))}
                >
                  {variants.map((buttonVariant) => (
                    <Button
                      key={buttonVariant}
                      variant={buttonVariant}
                      disabled
                    >
                      {buttonVariant} disabled
                    </Button>
                  ))}
                </Banner>
                {variants.map((buttonVariant) => (
                  <Button
                    key={buttonVariant}
                    variant={buttonVariant}
                    color="primary"
                    disabled
                  >
                    {buttonVariant} reference
                  </Button>
                ))}
              </div>
            );
            const expected = getComputedStyle(
              canvas.getByTitle('Expected palette')
            );
            for (const buttonVariant of variants) {
              const button = canvas.getByRole('button', {
                name: buttonVariant,
              });
              await pointer.hover(button);
              const hover = {
                color:
                  buttonVariant === 'filled'
                    ? theme === 'dark'
                      ? 'rgb(61, 61, 61)'
                      : 'rgb(255, 255, 255)'
                    : expected.backgroundColor,
                backgroundColor:
                  buttonVariant === 'filled'
                    ? expected.backgroundColor
                    : expected.borderColor,
                borderColor:
                  buttonVariant === 'ghost'
                    ? expected.borderColor
                    : expected.backgroundColor,
              };
              await expect(buttonStyle(button)).toEqual(hover);
              await pointer.click(button);
              await expect(onPress).toHaveBeenLastCalledWith(true, hover);
              await pointer.unhover(button);
              await expect(
                buttonStyle(
                  canvas.getByRole('button', {
                    name: `${buttonVariant} disabled`,
                  })
                )
              ).toEqual(
                buttonStyle(
                  canvas.getByRole('button', {
                    name: `${buttonVariant} reference`,
                  })
                )
              );
            }
          }
        );
      }
    }
  },
};
