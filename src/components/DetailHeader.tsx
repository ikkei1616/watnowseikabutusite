import { Box, Typography } from "@mui/material";
import DottedDivider from "./DottedDivider";

const DetailHeader = ({ title }: { title: string }) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          paddingLeft: "8px",
          fontSize: "1.5rem",
          color: "#00AEEF",
        }}
      >
        {title}
      </Typography>
      <DottedDivider color="#00AEEF" />
    </Box>
  );
};

export default DetailHeader;
