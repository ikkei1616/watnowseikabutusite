import React from "react";
import { Box } from "@mui/material";

interface DottedDividerProp {
  color: string;
}

const DottedDivider: React.FC<DottedDividerProp> = ({ color }) => {
  return (
    <Box
      sx={{
        borderBottom: `1px dashed ${color}`,
        paddingBottom: "8px",
      }}
    />
  );
};

export default DottedDivider;
