import { Box } from "@mui/material";
import { FC } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  name?: string;
  hidden?: boolean;
}

const TabPanel: FC<TabPanelProps> = ({
  name = "simple",
  children,
  index,
  hidden = false,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`${name}-tabpanel-${index}`}
      aria-labelledby={`${name}-tab-${index}`}
      {...other}
    >
      {!hidden && <Box>{children}</Box>}
    </div>
  );
};

export default TabPanel;
