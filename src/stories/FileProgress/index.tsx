import { FC, useState } from "react";
import {
  Card,
  Typography,
  Icon,
  Progress,
  Button,
  Tooltip,
} from "@equinor/eds-core-react";
import {
  check_circle_outlined,
  close_circle_outlined,
  pause_circle_outlined,
  refresh,
} from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import { truncate } from "lodash";

const { elevation, colors } = tokens;

const StyledCard = styled(Card)`
  box-shadow: ${elevation.raised};
  overflow: hidden;
  margin: 10px 0;
`;

interface TopProgressProps {
  paused?: boolean;
  error?: boolean;
}

const TopProgress = styled(Progress.Linear)<TopProgressProps>`
  position: absolute;
  top: 0;
  div {
    background-color: ${(props) =>
      props.paused ? colors.interactive.warning__resting.hsla : ""};
    background-color: ${(props) =>
      props.error ? colors.interactive.danger__resting.hsla : ""};
  }
`;

const getTitle = (
  status: "loading" | "paused" | "error" | "done",
  errorMsg?: string
) => {
  switch (status) {
    case "loading":
      return <Typography variant="overline">Uploading</Typography>;
    case "paused":
      return <Typography variant="overline">Upload is paused</Typography>;
    case "error":
      return <Typography variant="overline">{`${errorMsg}`}</Typography>;
    case "done":
      return <Typography variant="overline">Success!</Typography>;
  }
};

const getIcon = (status: "loading" | "paused" | "error" | "done") => {
  switch (status) {
    case "loading":
      return (
        <Icon
          color={colors.text.static_icons__tertiary.hex}
          data={pause_circle_outlined}
          size={24}
        />
      );
    case "paused":
      return (
        <Icon
          color={colors.interactive.warning__resting.hex}
          data={pause_circle_outlined}
          size={24}
        />
      );
    case "error":
      return <Icon data={refresh} size={24} />;
    case "done":
      return (
        <Icon
          color={colors.interactive.primary__resting.hex}
          data={check_circle_outlined}
          size={24}
        />
      );
  }
};

const getStatus = (loading?: boolean, error?: boolean, paused?: boolean) => {
  if (error) return "error";
  if (paused) return "paused";
  if (loading) return "loading";
  return "done";
};

export interface FileProgressProps {
  error?: boolean;
  errorMsg?: string;
  id: string;
  loading?: boolean;
  name: string;
  onDelete: (name: string) => void;
}

const FileProgress: FC<FileProgressProps> = ({
  error,
  errorMsg,
  id,
  name,
  onDelete,
  loading,
}) => {
  const [paused, setPaused] = useState(false);
  return (
    <StyledCard>
      <TopProgress
        variant={error || !loading ? "determinate" : "indeterminate"}
        value={error || !loading ? 100 : undefined}
        paused={paused}
        error={error}
      />
      <Card.Header>
        <Card.HeaderTitle>
          {getTitle(getStatus(loading, error, paused), errorMsg)}
          {name.length > 25 ? (
            <Tooltip title={name}>
              <Typography variant="h4" token={{ fontWeight: 500 }}>
                {truncate(name, { length: 25 })}
              </Typography>
            </Tooltip>
          ) : (
            <Typography variant="h4" token={{ fontWeight: 500 }}>
              {truncate(name, { length: 25 })}
            </Typography>
          )}
        </Card.HeaderTitle>
        <Button
          variant="ghost_icon"
          onClick={loading ? () => setPaused((p) => !p) : undefined}
          disabled
        >
          {getIcon(getStatus(loading, error, paused))}
        </Button>
        <Button
          variant="ghost_icon"
          onClick={() => onDelete(id)}
          disabled={loading}
        >
          <Icon
            color={colors.text.static_icons__tertiary.hex}
            data={close_circle_outlined}
            size={24}
          />
        </Button>
      </Card.Header>
    </StyledCard>
  );
};

export default FileProgress;
