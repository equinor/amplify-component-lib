import React from "react";
import DataAcquisition from "./data-acquisition";
import DataExperience from "./data-experience";
import { find } from "lodash";
import DataSharing from "./data-sharing";
import DataTracker from "./data-tracker";
import Default from "./default";
import Portal from "./portal";
import NothingOutline from "./nothing-outline";
import NothingFilled from "./nothing-filled";
import SomethingFilled from "./something-filled";
import SomethingOutline from "./something-outline";

interface IApplicationIconProps {
  name: "data acquisition" | "data experience" | "data tracker" | "data sharing" | "portal" | "default" | string;
  size?: 16 | 24 | 32 | 40 | 48;
}

interface IFeedBackIconProps {
  name: "positive" | "negative" | "default";
  variant?: "filled" | "outline";
  size?: 16 | 24 | 32 | 40 | 48;
}

export interface ISvgIconProps {
  size?: 16 | 24 | 32 | 40 | 48;
}

interface IApplicationIconData {
  appName: string;
  component: React.FC<ISvgIconProps>;
}

const apps: IApplicationIconData[] = [
  { appName: "default", component: Default },
  { appName: "portal", component: Portal },
  { appName: "data acquisition", component: DataAcquisition },
  { appName: "data experience", component: DataExperience },
  { appName: "data sharing", component: DataSharing },
  { appName: "data tracker", component: DataTracker },
];

const ApplicationIcon: React.FC<IApplicationIconProps> = ({ name, size }) => {
  const Fallback = apps[0].component;
  if (name) {
    const appData = find(apps, { appName: name });
    if (appData) {
      return <appData.component size={size} />;
    }

    return <Fallback size={size} />;
  }

  console.warn(`Unable to find app icon with name ${name}, returning default icon`);
  return <Fallback size={size} />;
};

interface IFeedBackIconData {
  iconName: string;
  component: React.FC<ISvgIconProps>;
}

const feedbackIcons: IFeedBackIconData[] = [
  { iconName: "default", component: Default },
  { iconName: "nothing-outline", component: NothingOutline },
  { iconName: "nothing-filled", component: NothingFilled },
  { iconName: "something-filled", component: SomethingFilled },
  { iconName: "something-outline", component: SomethingOutline },
];

const FeedBackIcon: React.FC<IFeedBackIconProps> = ({ name, size, variant }) => {
  const DefaultComponent = feedbackIcons[0].component;
  if (name === "default") {
    return <DefaultComponent size={size} />;
  }

  const appData = find(feedbackIcons, {
    iconName: `${name === "positive" ? "something" : "nothing"}-${variant ? variant : "filled"}`,
  });
  if (appData) {
    return <appData.component size={size} />;
  }

  return <DefaultComponent size={size} />;
};

export { ApplicationIcon, FeedBackIcon };
