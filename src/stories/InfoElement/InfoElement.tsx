import { Typography } from "@equinor/eds-core-react";
import React, { ReactElement } from "react";

export interface InfoElementProps {
  title: string;
  content: ReactElement | string;
}

const InfoElement: React.FC<InfoElementProps> = ({ title, content }) => (
  <div>
    <Typography group="paragraph" variant="overline">
      {title?.toUpperCase()}
    </Typography>
    {typeof content === "string" ? (
      <Typography variant="h6">{content}</Typography>
    ) : (
      content
    )}
  </div>
);

export default InfoElement;
