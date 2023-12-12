// https://github.com/mui/material-ui/issues/35251

import { BreakpointOverrides } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    "2xl": true;
  }
}
