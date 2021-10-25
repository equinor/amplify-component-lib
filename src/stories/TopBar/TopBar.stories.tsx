import React from 'react';
import { Button, Icon } from '@equinor/eds-core-react';
import {
  account_circle,
  car,
  dashboard,
  favorite_outlined,
  history,
  home,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Story, Meta } from '@storybook/react';

const { colors } = tokens;

import TopBar from '../../components/TopBar';
import SideBar from '../../components/SideBar';

export default {
  title: 'TopBar',
  component: TopBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

export const Primary: Story = () => {
  return (
    <TopBar
      onHeaderClick={() => console.log('Going to homepage 🏠')}
      applicationIcon={car}
      applicationName="Heinrich von Schnellfahrer"
    >
      <TopBar.Actions>
        <Button variant="ghost_icon" key="account">
          <Icon
            data={account_circle}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>
      </TopBar.Actions>
    </TopBar>
  );
};

export const WithFetchingSetToTrue: Story = () => {
  return (
    <TopBar
      onHeaderClick={() => console.log('Going to homepage 🏠')}
      applicationIcon={car}
      applicationName="Heinrich von Schnellfahrer"
      isFetching
    >
      <TopBar.Actions>
        <Button variant="ghost_icon" key="account">
          <Icon
            data={account_circle}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>
      </TopBar.Actions>
    </TopBar>
  );
};

export const ExampleWithSidebar: Story = () => {
  const menuItems = [
    {
      link: '/home',
      name: 'home',
      icon: home,
    },
    {
      link: '/dashboard',
      name: 'dashboard',
      icon: dashboard,
    },
    {
      link: '/history',
      name: 'history',
      icon: history,
    },
    {
      link: '/favourites',
      name: 'favourites',
      icon: favorite_outlined,
    },
  ];
  return (
    <div style={{ height: '50vh' }}>
      <TopBar
        onHeaderClick={() => console.log('Going to homepage 🏠')}
        applicationIcon={
          <svg
            width={32}
            height={32}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="data-acquisition-mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="48"
              height="48"
            >
              <rect
                x="48"
                y="48"
                width="48"
                height="48"
                rx="8"
                transform="rotate(-180 48 48)"
                fill="#C4C4C4"
              />
            </mask>
            <g mask="url(#data-acquisition-mask0)">
              <path
                d="M58.3882 22.4755C80.0489 -22.8744 37.1875 -11.4475 13.0492 -0.0653701C-17.4634 12.1999 -9.62457 30.1465 -1.54353 38.0046C-1.25484 38.2853 -0.988633 38.5709 -0.733288 38.8823C10.3131 52.3518 36.9741 67.3091 58.3882 22.4755Z"
                fill="#004F55"
              />
              <g filter="url(#data-acquisition-filter0_dd)">
                <path
                  d="M5.23093 -11.5923C-23.8604 2.96082 16.395 18.9384 35.9889 21.4114C59.7331 25.4941 52.933 7.7762 49.8436 0.910734C49.6559 0.493722 49.5052 0.0670877 49.3737 -0.3709C46.3547 -10.4302 33.6955 -25.8319 5.23093 -11.5923Z"
                  fill="#007079"
                />
              </g>
              <g filter="url(#data-acquisition-filter1_dd)">
                <path
                  d="M46.676 54.3199C74.0253 37.2408 43.8618 30.2339 25.3613 28.8653C2.21685 25.9786 -7.81213 40.711 -2.10191 51.2683C3.29105 61.2391 19.3267 71.399 46.676 54.3199Z"
                  fill="#007079"
                />
              </g>
              <path
                d="M26.9412 18.0217L15 18.0217C14.4477 18.0217 14 18.4694 14 19.0217L14 30.9845C14 31.5368 14.4477 31.9845 15 31.9845L26.9412 31.9845C29.2941 31.9845 34 32.3724 34 29.2696M26.9412 18.0217L26.9412 15.045C26.9412 14.4754 27.4141 14.0246 27.9804 14.0852C29.9431 14.2955 34 14.986 34 17.1028C34 19.8951 34 25.5203 34 29.2696M26.9412 18.0217L26.9412 22.0942L26.9412 25.7546C26.9412 26.3453 27.4513 26.8124 28.0419 26.7978C30.0264 26.7489 34 26.9416 34 29.2696"
                stroke="#F5F5F5"
                strokeWidth="3"
              />
              <path
                d="M32.5 22.7925V18.1786C32.5 17.2172 31.8892 16.362 30.9797 16.0502C29.5193 15.5495 28 16.6347 28 18.1786V22.7925C28 23.9363 28.8581 24.8981 29.9945 25.0279C31.3297 25.1805 32.5 24.1363 32.5 22.7925Z"
                stroke="#F5F5F5"
                strokeWidth="5"
              />
            </g>
            <defs>
              <filter
                id="data-acquisition-filter0_dd"
                x="-12.1434"
                y="-26.9844"
                width="75.7525"
                height="59.8771"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow"
                  result="effect2_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow"
                  result="shape"
                />
              </filter>
              <filter
                id="data-acquisition-filter1_dd"
                x="-11"
                y="20"
                width="74.3179"
                height="58.4825"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow"
                  result="effect2_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        }
        applicationName="Heinrich von Schnellfahrer"
        isFetching
      >
        <TopBar.Actions>
          <Button variant="ghost_icon" key="account">
            <Icon
              data={account_circle}
              size={24}
              color={colors.interactive.primary__resting.hsla}
            />
          </Button>
        </TopBar.Actions>
      </TopBar>
      <div style={{ display: 'flex', height: 'calc(50vh - 72px)' }}>
        <SideBar>
          {menuItems.map((m) => (
            <SideBar.Item key={m.name} {...m} />
          ))}
        </SideBar>
      </div>
    </div>
  );
};

export const ExampleWithSidebarCustomIcon: Story = () => {
  const menuItems = [
    {
      link: '/home',
      name: 'home',
      icon: home,
    },
    {
      link: '/dashboard',
      name: 'dashboard',
      icon: dashboard,
    },
    {
      link: '/history',
      name: 'history',
      icon: history,
    },
    {
      link: '/favourites',
      name: 'favourites',
      icon: favorite_outlined,
    },
  ];

  return (
    <div style={{ height: '50vh' }}>
      <TopBar
        onHeaderClick={() => console.log('Going to homepage 🏠')}
        applicationIcon={car}
        applicationName="Heinrich von Schnellfahrer"
        isFetching
      >
        <TopBar.Actions>
          <Button variant="ghost_icon" key="account">
            <Icon
              data={account_circle}
              size={24}
              color={colors.interactive.primary__resting.hsla}
            />
          </Button>
        </TopBar.Actions>
      </TopBar>
      <div style={{ display: 'flex', height: 'calc(50vh - 72px)' }}>
        <SideBar>
          {menuItems.map((m) => (
            <SideBar.Item key={m.name} {...m} />
          ))}
        </SideBar>
      </div>
    </div>
  );
};
